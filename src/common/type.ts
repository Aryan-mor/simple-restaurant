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

type summeryType = {
    totalPlatePrice: number,
    discount: number,
    deliveryPrice: number
}

export type basketContextType = basketContextWithoutCallbackType & {
    summary: summeryType,
    onAdd: (code: string, count?: number) => void
    onRemove: (code: string) => void
    onPayment: () => void
}

export type invoiceType = basketContextWithoutCallbackType & {
    id: number,
    date: Date,
    summery: summeryType
}
