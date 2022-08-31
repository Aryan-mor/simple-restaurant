import React from "react";
import Plates from "../components/plates/Plates"
import BasketSummary from "../components/basketSummary/BasketSummary";

const Home = () => {

    return (
        <div className="container d-flex flex-wrap mt-5">
            <Plates/>
            <BasketSummary/>
        </div>
    )
}

export default Home
