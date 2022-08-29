import React from "react";
import Logo from "../../img/logo.jpg"
import {Link} from "react-router-dom";
import "./header.scss"
import ROUTS from "../../common/ROUTS";
import {useBasketContext} from "../../context/Basket";


const menu = [{
    name: 'Home',
    to: ROUTS.Home.rout
}, {
    name: 'Invoices',
    to: ROUTS.Invoices.createLink()
},]

const Header = () => {
    const {count} = useBasketContext()

    return (
        <header className='container header d-flex align-items-center'>
            <div className="d-flex align-items-center flex-fill">
                <div className="logo">
                    <Link to={ROUTS.Home.rout}><img alt="site logo" src={Logo}/></Link>
                </div>
                <ul>
                    {
                        menu.map(({name, to}) => (
                            <li key={name} className="span">
                                <Link to={to} className="h5">{name}</Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div>
                <span className="btn btn-primary position-relative pe-none">
                    <i className="fa-solid fa-basket-shopping"/>
                    {
                        count > 0 &&
                        <span
                            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {count}
                        </span>
                    }
                </span>
            </div>
        </header>
    )
}

export default Header
