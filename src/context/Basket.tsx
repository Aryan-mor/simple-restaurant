import React, {useCallback, useContext, useMemo, useState} from "react";
import {basketContextType, basketContextWithoutCallbackType, basketType, invoiceType, Props} from "../common/type"
import Storage from "../common/Storage";
import {data} from "../common/data";
import {getPrice, roundPrice} from "../common/priceUtils";
import {INVOICE_STORAGE_KEY, PLATE_STORAGE_KEY} from "../common/const";

export const defaultBasketContext = {
    count: 0,
    basket: {},
    summary: {
        totalPlatePrice: 0,
        discount: 0,
        deliveryPrice: 0
    },
    onAdd: () => {
    },
    onRemove: () => {
    },
    onPayment: () => {
    }
};

const BasketContext = React.createContext<basketContextType>(defaultBasketContext)
export default BasketContext;


export function BasketContextContainer({children}: Props) {

    const [count, setCount] = useState<number>((() => {
        // Revalidate user Basket Count from LocalStorage
        const {count} = Storage.get<basketContextWithoutCallbackType>(PLATE_STORAGE_KEY, {
            count: 0,
            basket: {}
        })
        return count
    })())

    const [basket, setBasket] = useState<basketType>((() => {
        // Revalidate user Basket from LocalStorage
        const {basket} = Storage.get<basketContextWithoutCallbackType>(PLATE_STORAGE_KEY, {
            count: 0,
            basket: {}
        })
        return basket
    })())

    const [totalPlatePrice, discount, deliveryPrice] = useMemo(() => {
        // Calculation the basket summary price
        let discount = 0;
        let totalPlatePrice = 0;
        Object.keys(basket).forEach(code => {
            const count = basket[code]
            const plate = data.find(d => d.code === code)
            if (!plate || count <= 0)
                return
            const {price, secondHalf} = plate;
            if (secondHalf && count > 1) {
                discount += roundPrice(price / 2)
            }
            totalPlatePrice += getPrice(plate, count)
        })

        const deliveryPrice = totalPlatePrice < 50 ? 4.95 : totalPlatePrice < 90 ? 2.95 : 0
        return [totalPlatePrice, discount, deliveryPrice]
    }, [basket])
    const summery = {
        totalPlatePrice,
        discount,
        deliveryPrice
    }

    const handleAddToBasket = useCallback((code: string, count: number = 1): void => {
        const newBasket = Object.assign({}, basket)
        newBasket[code] = Math.max(0, count);
        const newCount = Object.values(newBasket).reduce((a, b) => a + b, 0)
        setBasket(newBasket)
        setCount(newCount)

        Storage.set(PLATE_STORAGE_KEY, {
            count: newCount,
            basket: newBasket
        })
    }, [basket])

    const handleRemoveFromBasket = useCallback((code: string): void => {
        handleAddToBasket(code, 0)
    }, [handleAddToBasket])

    const handlePayment = useCallback((): void => {
        if (count <= 0) {
            return
        }
        // Add invoice to storage
        const invoiceList = Storage.get<invoiceType[]>(INVOICE_STORAGE_KEY, [])
        const newInvoice = {
            id: (invoiceList?.[invoiceList?.length - 1]?.id + 1) || 1,
            count,
            basket,
            date: new Date(),
            summery,
        } as invoiceType;

        invoiceList.push(newInvoice)
        Storage.set(INVOICE_STORAGE_KEY, invoiceList)

        // Rest Basket
        Storage.set(PLATE_STORAGE_KEY, {
            count: 0,
            basket: {}
        })
        setCount(0)
        setBasket({})
    }, [basket, count])


    return (
        <BasketContext.Provider value={{
            count,
            basket,
            onAdd: handleAddToBasket,
            onRemove: handleRemoveFromBasket,
            onPayment: handlePayment,
            summary: {
                totalPlatePrice,
                discount,
                deliveryPrice
            }
        }}>
            {children}
        </BasketContext.Provider>
    )
}

export function useBasketContext() {
    return useContext(BasketContext)
}
