import React from 'react';
import Header from "./components/header/Header";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home"
import InvoiceSingle from "./pages/invoices/InvoiceSingle"
import InvoicesList from "./pages/invoices/InvoicesList";

function App() {
    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="invoices">
                    <Route path=":id" element={<InvoiceSingle/>}/>
                    <Route index element={<InvoicesList/>}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
