import React, {useCallback, useContext, useEffect, useState} from "react";
import {Props} from "../common/type"
import Storage from "../common/Storage";

type basketType = {
    [key: string]: number
}

type basketContextWithoutCallbackType = {
    count: number,
    basket: basketType,
}

type basketContextType = basketContextWithoutCallbackType & {
    onAdd: (code: string, count?: number) => void
    onRemove: (code: string) => void
}

export const defaultBasketContext = {
    count: 0,
    basket: {},
    onAdd: () => {
    },
    onRemove: () => {
    }
};

const BasketContext = React.createContext<basketContextType>(defaultBasketContext)
export default BasketContext;

const STORAGE_KEY = "basket";

export function BasketContextContainer({children}: Props) {
    const [count, setCount] = useState<number>((() => {
        const {count} = Storage.get<basketContextWithoutCallbackType>(STORAGE_KEY, {
            count: 0,
            basket: {}
        })
        return count
    })())
    const [basket, setBasket] = useState<basketType>((() => {
        const {basket} = Storage.get<basketContextWithoutCallbackType>(STORAGE_KEY, {
            count: 0,
            basket: {}
        })
        return basket
    })())

    const handleAddToBasket = useCallback((code: string, count: number = 1): void => {
        const newBasket = Object.assign({}, basket)
        newBasket[code] = Math.max(0, count);
        const newCount = Object.values(newBasket).reduce((a, b) => a + b, 0)
        setBasket(newBasket)
        setCount(newCount)

        Storage.set(STORAGE_KEY, {
            count: newCount,
            basket: newBasket
        })
    }, [basket])

    const handleRemoveFromBasket = useCallback((code: string): void => {
        handleAddToBasket(code, 0)
    }, [handleAddToBasket])

    useEffect(() => {
        const {count, basket} = Storage.get<basketContextWithoutCallbackType>(STORAGE_KEY, {
            count: 0,
            basket: {}
        })
        setCount(count)
        setBasket(basket)
    }, [])


    return (
        <BasketContext.Provider value={{
            count,
            basket,
            onAdd: handleAddToBasket,
            onRemove: handleRemoveFromBasket
        }}>
            {children}
        </BasketContext.Provider>
    )
}


export function useBasketContext() {
    return useContext(BasketContext)
}
