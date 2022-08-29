import React from "react"
import {data} from "../../common/data";
import Plate from "../plate/Plate";


const Plates = () => {


    return (
        <div className="container flex mt-5 d-flex flex-wrap">
            {data.map((plate) => (
                <div key={plate.code} className="col-12 col-lg-4 p-3">
                    <Plate plate={plate}/>
                </div>
            ))}
        </div>
    )
}

export default Plates;
