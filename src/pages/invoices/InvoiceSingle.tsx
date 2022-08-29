import React, {useEffect, useMemo} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import ROUTS from "../../common/ROUTS";
import {invoiceType} from "../../common/type";
import Storage from "../../common/Storage";
import {INVOICE_STORAGE_KEY} from "../../common/const";
import {convertToUSD, getPrice} from "../../common/priceUtils";
import {data} from "../../common/data";


const InvoiceSingle = () => {
    const {invoiceId} = useParams();
    const navigation = useNavigate()

    const invoiceData = useMemo<invoiceType | undefined>(() => {
        const invoices = Storage.get<invoiceType[]>(INVOICE_STORAGE_KEY, [])
        const invId = Number(invoiceId);
        return invoices.find(inv => inv.id === invId)
    }, [invoiceId])

    useEffect(() => {
        if (!invoiceData || !invoiceId)
            navigation(ROUTS.Invoices.createLink())
    }, [invoiceData, invoiceId, navigation])


    if (!invoiceData)
        return <React.Fragment/>

    console.log("askjfkasf", invoiceData)

    const {id, count, basket, date, summery} = invoiceData
    const {totalPlatePrice, deliveryPrice, discount} = summery

    return (
        <div className="container d-flex flex-wrap mt-5">
            <h3 className="col-12 mb-4 pb-3 border-bottom m-0">
                <Link to={ROUTS.Invoices.createLink()}>
                    <span className="h3 pe-1" role="button">Invoices</span>
                </Link>
                / Invoice-{id}
            </h3>
            <div className="d-flex flex-wrap col-12 col-md-7 col-xl-9">
                {
                    (Object.keys(basket).map(code => {
                        const count = basket[code];
                        const plate = data.find(plate => plate.code === code)
                        if (!plate || count <= 0)
                            return <React.Fragment key={code}/>

                        const {img, name, price} = plate


                        return (
                            <div key={code} className="d-flex col-6 my-3 p-3">
                                <div className="col-3">
                                    <img className="rounded w-100 h-auto" src={img} alt={name}/>
                                </div>
                                <div className="d-flex flex-column ps-3">
                                    <h6>
                                        {name} ({count})
                                    </h6>
                                    <span>
                                        Total Price: {convertToUSD(getPrice(plate, count))}
                                    </span>
                                </div>
                            </div>
                        )

                    }))
                }
            </div>
            <div className="card d-flex flex-column p-3 col-12 col-md-5 col-xl-3 align-self-start">
                <span className="pb-2">
                    Discount Price: {convertToUSD(discount)}
                </span>
                <span className="pb-2">
                    Delivery Price: {convertToUSD(deliveryPrice)}
                </span>
                <span className="pb-2">
                    Total Plate Price: {convertToUSD(totalPlatePrice)}
                </span>
                <span className="pb-2">
                    Total Price: {convertToUSD(totalPlatePrice + deliveryPrice)}
                </span>
                <span className="pt-2 text-success border-top">
                    Status: Payed
                </span>
            </div>
        </div>
    )
}

export default InvoiceSingle
