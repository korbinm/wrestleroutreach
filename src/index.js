import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./webpages/Layout.js";
import Home from "./webpages/home.js";
import Dashboard from "./webpages/Dashboard";
import Register from "./webpages/Register.js";
import Login from "./webpages/Login.js"
import Paypal from "./webpages/Paypal.js"
import ErrorPage from "./webpages/ErrorPage";
import { Auth0Provider } from "@auth0/auth0-react";

function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path = "/" element = {<Layout />}>
                    <Route index element = {<Home />} />
                    <Route path = "dashboard" element = {<Dashboard />} />
                    <Route path = "register" element = {<Register />}/>
                    <Route path = "login" element = {<Login />}/>
                    <Route path = "Paypal" element = {<Paypal />}/>

                    <Route path="*" element ={<ErrorPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
export default App;
ReactDOM.render(
    <Auth0Provider
        domain="dev-ojdglpcy.us.auth0.com"
        clientId="Vt30qgA0bgk50xoWqpM8KszPNFZkH9nJ"
        redirectUri={window.location.origin}
    >
        <App />
    </Auth0Provider>,
    document.getElementById("root"));

// reportWebVitals();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals