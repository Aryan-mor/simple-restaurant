import {plate} from "./type";
import RedPlate from "../img/red-plate.jpg"
import GreenPlate from "../img/green-plate.jpg"
import BluePlate from "../img/blue-plate.jpg"
import {convertToUSD} from "./priceUtils";

const redPlatePrice = 32.95
export const data: plate[] = [
    {
        name: "Red Plate",
        price: redPlatePrice,
        code: 'R01',
        img: RedPlate,
        secondHalf: true,
        description: `Buy 2 Pay ${convertToUSD(redPlatePrice + (redPlatePrice / 2))}`,
        max: 8
    },
    {
        name: "Green Plate",
        price: 24.95,
        code: 'G01',
        img: GreenPlate,
        max: 6
    },
    {
        name: "Blue Plate",
        price: 7.95,
        code: 'B01',
        img: BluePlate,
        max: 9
    },
]

