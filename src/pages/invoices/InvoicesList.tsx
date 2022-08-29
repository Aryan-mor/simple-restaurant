import React, {useMemo} from "react";
import Storage from "../../common/Storage";
import {INVOICE_STORAGE_KEY} from "../../common/const";
import {invoiceType} from "../../common/type";
import {convertToUSD} from "../../common/priceUtils";
import {Link} from "react-router-dom";
import ROUTS from "../../common/ROUTS";


const InvoiceItem = ({invoice}: { invoice: invoiceType }) => {
    const {count, basket, id, date, summery} = invoice
    const {discount, totalPlatePrice, deliveryPrice} = summery
    return (
        <tr>
            <th scope="row">{id}</th>
            <td>{count}</td>
            <td>{new Date(date).toLocaleDateString("en-US")}</td>
            <td>{convertToUSD(deliveryPrice)}</td>
            <td>{convertToUSD(discount)}</td>
            <td>{convertToUSD(totalPlatePrice)}</td>
            <td>{convertToUSD(totalPlatePrice + deliveryPrice)}</td>
            <td>
                <Link to={ROUTS.Invoices.Single.createLink(id)}>
                    <button className="btn btn-primary">
                        Show
                    </button>
                </Link>
            </td>
        </tr>
    )
}

const InvoicesList = () => {

    const data = useMemo<invoiceType[]>(() => {
        return Storage.get<invoiceType[]>(INVOICE_STORAGE_KEY, [])
    }, [])

    return (
        <div className="container mt-3">
            <h2>Invoices</h2>
            <div className="d-flex flex-column">
                {
                    data.length > 0 ?
                        <table className="table mt-3">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Count</th>
                                <th scope="col">Date</th>
                                <th scope="col">Delivery Price</th>
                                <th scope="col">Discount</th>
                                <th scope="col">Total Plate Price</th>
                                <th scope="col">Total Price</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                data.map(invoice => <InvoiceItem key={invoice.id} invoice={invoice}/>)
                            }
                            </tbody>
                        </table> :
                        <div className={"h1 mt-5 text-center"}>
                            No Invoice
                        </div>
                }
            </div>
        </div>
    )
}

export default InvoicesList
