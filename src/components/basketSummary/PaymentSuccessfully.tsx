import React, {Dispatch, SetStateAction} from "react"
import {Link} from "react-router-dom";
import ROUTS from "../../common/ROUTS";

type propType = { show: boolean, onClose: (show: boolean) => void | Dispatch<SetStateAction<boolean>> }
export default function PaymentSuccessfully({
                                                show,
                                                onClose
                                            }: propType) {


    if (!show)
        return <React.Fragment/>

    return (
        <div className="d-flex flex-column card mt-3 p-3 bg-success align-items-start">
            <div className={"d-flex w-100"}>
                <h5 className="flex-fill text-white">
                    Payment Successful
                </h5>
                <i
                    role="button"
                    data-cy="successfully-close-btn"
                    className=" p-1 fa-solid fa-xmark text-white"
                    onClick={() => onClose(false)}
                />
            </div>
            <Link className="mt-2" to={ROUTS.Invoices.createLink()}>
                <small className="text-white opacity-75">
                    You can check your invoices here
                </small>
            </Link>
        </div>
    )
}
