import React, {useState} from "react";
import {useBasketContext} from "../../context/Basket";
import ShowSummary from "./ShowSummary";
import PaymentSuccessfully from "./PaymentSuccessfully";

const Empty = () => {
    return (
        <span className="d-flex justify-content-center align-items-center">
            <span className="h6 m-0">
                Your Basket Is Empty
            </span>
            <i className="fa-solid fa-face-grin-beam-sweat ms-2 text-green pt-1"/>
        </span>
    )
}


const style = {top: 15}
const BasketSummary = () => {
    const [showPaymentSuccessfully, setShowPaymentSuccessfully] = useState(false)
    const {count, onPayment} = useBasketContext()

    function handlePayment() {
        onPayment()
        setShowPaymentSuccessfully(true)
    }

    return (
        <div className="sticky-top card p-3 col-12 col-lg-3 flex-fill mt-3 align-self-start"
             style={style}>
            {count <= 0 ?
                <Empty/> :
                <ShowSummary onPayment={handlePayment}/>}
            <PaymentSuccessfully show={showPaymentSuccessfully} onClose={setShowPaymentSuccessfully}/>
        </div>
    )
}

export default BasketSummary;

