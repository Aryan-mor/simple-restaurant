import {useBasketContext} from "../../context/Basket";
import React from "react";
import PlateItem from "./PlateItem";
import {convertToUSD} from "../../common/priceUtils";
import {Button} from "react-bootstrap";


const ShowSummary = ({onPayment}: { onPayment: () => void }) => {
    const {basket, summary,} = useBasketContext()
    const {totalPlatePrice, discount, deliveryPrice} = summary;

    return (
        <div>
            <h6 className="d-flex align-items-center">
                <i className="fa-solid fa-basket-shopping me-2"/> Your Basket
            </h6>
            {
                Object.keys(basket).map((code) => <PlateItem key={code} code={code}/>)
            }
            <div className="d-flex flex-column border-top pt-2">
                <small className="fw-bold opacity-75">
                    Discount:
                    <span className="ps-2 fw-normal">
                        {convertToUSD(discount)}
                    </span>
                </small>
                <small className="fw-bold pt-2 opacity-75">
                    Total Plate Price:
                    <span className="ps-2 fw-normal">
                        {convertToUSD(totalPlatePrice)}
                    </span>
                </small>
                <small className="fw-bold pt-2 opacity-75">
                    Delivery Price:
                    <span className="ps-2 fw-normal">
                        {convertToUSD(deliveryPrice)}
                    </span>
                </small>
                <span className="fw-bold pt-3 h5">
                    Total Price:
                    <span className="ps-2 fw-normal">
                        {convertToUSD(totalPlatePrice + deliveryPrice)}
                    </span>
                </span>
            </div>
            <Button
                className={'mt-3 w-100'}
                onClick={onPayment}>
                Order Now
            </Button>
        </div>
    )
}

export default ShowSummary
