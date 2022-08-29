import {plate} from "./type"

// Rounding price two number after dot
export const roundPrice = (price: number) => Number(price.toFixed(3).slice(0, -1))


// Price to USD Format
export const convertToUSD = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(roundPrice(price));
}

// Calculate the price with counting and discount
export const getPrice = (plate: plate, count: number): number => {
    const {price, secondHalf} = plate
    if (count === 1)
        return roundPrice(price);

    return (price * (count - 1)) + (secondHalf ? roundPrice(price / 2) : price)
}
