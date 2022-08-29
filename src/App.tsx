import React from 'react';
import Header from "./components/header/Header";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home"
import InvoiceSingle from "./pages/invoices/InvoiceSingle"
import InvoicesList from "./pages/invoices/InvoicesList";
import ROUTS from "./common/ROUTS";
import {BasketContextContainer} from "./context/Basket";

function App() {
    return (
        <BasketContextContainer>
            <div className="App">
                <Header/>
                <Routes>
                    <Route path={ROUTS.Home.rout} element={<Home/>}/>
                    <Route path={ROUTS.Invoices.rout}>
                        <Route path={ROUTS.Invoices.Single.rout} element={<InvoiceSingle/>}/>
                        <Route index element={<InvoicesList/>}/>
                    </Route>
                </Routes>
            </div>
        </BasketContextContainer>
    );
}

export default App;
