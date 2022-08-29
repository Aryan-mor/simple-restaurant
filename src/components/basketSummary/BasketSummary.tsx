import React from "react";
import {useBasketContext} from "../../context/Basket";
import ShowSummary from "./ShowSummary";

const Empty = () => {
    return (
        <span className="h6 d-flex justify-content-center align-items-center m-0">
            Your Basket is Empty
            <i className="fa-solid fa-face-grin-beam-sweat ms-2"/>
        </span>
    )
}


const style = {top: 15}
const BasketSummary = () => {
    const {count} = useBasketContext()

    return (
        <div className="sticky-top card p-3 flex-fill mt-3 align-self-start"
             style={style}>
            {count <= 0 ?
                <Empty/> :
                <ShowSummary/>}
        </div>
    )
}

export default BasketSummary;

