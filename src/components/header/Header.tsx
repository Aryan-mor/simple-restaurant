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
                <div className="col-2 col-lg-1">
                    <Link to={ROUTS.Home.rout}><img className={"w-100 h-auto"} alt="site logo" src={Logo}/></Link>
                </div>
                <ul className={"m-0 ps-2"}>
                    {
                        menu.map(({name, to}) => (
                            <li key={name} className="span px-2 py-1 align-items-center">
                                <Link to={to} data-cy={name.toLocaleLowerCase()} className="h6">{name}</Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div>
                <span className="btn btn-green position-relative pe-none">
                    <i className="fa-solid fa-basket-shopping text-white"/>
                    {
                        count > 0 &&
                        <span
                            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-orange">
                            {count}
                        </span>
                    }
                </span>
            </div>
        </header>
    )
}

export default Header
