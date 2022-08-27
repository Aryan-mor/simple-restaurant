import React from "react";
import Logo from "../../img/logo.jpg"
import {Link} from "react-router-dom";
import "./header.scss"
import ROUTS from "../../common/ROUTS";


const menu = [{
    name: 'Home',
    to: ROUTS.Home.rout
}, {
    name: 'Invoices',
    to: ROUTS.Invoices.createLink()
},]

const Header = () => {

    return (
        <header className='container header flex align-center'>
            <div className="logo">
                <Link to={ROUTS.Home.rout}><img alt="site logo" src={Logo}/></Link>
            </div>
            <ul>
                {
                    menu.map(({name, to}) => (
                        <li key={name} className="span">
                            <Link to={to}>{name}</Link>
                        </li>
                    ))
                }
            </ul>
        </header>
    )
}

export default Header
