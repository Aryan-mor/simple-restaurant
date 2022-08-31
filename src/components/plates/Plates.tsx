import React from "react"
import {data} from "../../common/data";
import Plate from "../plate/Plate";


const Plates = () => {


    return (
        <div className=" flex d-flex flex-wrap col-12 col-lg-9 align-self-start">
            {data.map((plate) => (
                <div key={plate.code} className="col-12 col-lg-6 py-2 py-lg-3 px-lg-3">
                    <Plate plate={plate}/>
                </div>
            ))}
        </div>
    )
}

export default Plates;
