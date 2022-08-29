import {useBasketContext} from "../../context/Basket";
import {data} from "../../common/data";
import React from "react";
import {convertToUSD, getPrice} from "../../common/priceUtils";

type PlateItemPropsType = {
    code: string,
}

const PlateItem = ({code}: PlateItemPropsType) => {
    const {basket, onAdd} = useBasketContext()

    const count = basket[code]
    const plate = data.find(d => d.code === code)

    if (!plate || count < 1)
        return <React.Fragment key={code}/>

    const {name, img, secondHalf, price} = plate


    return (
        <div className="d-flex my-3 align-items-center">
            <div className="col-3">
                <img alt={name} src={img} className="w-100 h-auto rounded"/>
            </div>
            <div className="ps-3 d-flex flex-column">
                <h6 className="mb-1">
                    {name} ({count})
                </h6>
                {(secondHalf && count < 2) &&
                    <button
                        className="text-muted btn btn-link text-start p-0"
                        onClick={() => onAdd(code, 2)}>
                        <i className="fa-solid fa-star text-warning"/> Buy 1 more
                        with {convertToUSD(price / 2)}
                    </button>
                }
                <span className="fw-normal mt-2">{convertToUSD(getPrice(plate, count))}</span>
            </div>
        </div>
    )
}

export default PlateItem;
