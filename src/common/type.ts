export interface Props {
    children: JSX.Element[] | JSX.Element
}

export type plate = {
    name: string,
    price: number,
    code: string,
    description?: string,
    img: any,
    secondHalf?: boolean
}

export type basketType = {
    [key: string]: number
}

export type basketContextWithoutCallbackType = {
    count: number,
    basket: basketType,
}

export type basketContextType = basketContextWithoutCallbackType & {
    summary: {
        totalPlatePrice: number,
        discount: number,
        deliveryPrice: number
    },
    onAdd: (code: string, count?: number) => void
    onRemove: (code: string) => void
    onPayment: () => void
}

export type invoiceType = basketContextWithoutCallbackType & {
    id: number,
    date: Date
}
