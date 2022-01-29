import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./webpages/Layout.js";
import Home from "./webpages/home.js";
import Dashboard from "./webpages/Dashboard";
import Register from "./webpages/Register.js";
//import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';

export default function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path = "/" element = {<Layout />}>
                    <Route index element = {<Home />} />
                    <Route path = "dashboard" element = {<Dashboard />} />
                    <Route path = "register" element = {<Register />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
ReactDOM.render(<App />, document.getElementById("root"));

// reportWebVitals();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals