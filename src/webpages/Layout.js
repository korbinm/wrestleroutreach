import { Outlet, Link } from "react-router-dom";
import React from "react";

const Layout = () => {
    return (
        <>
            <header>
                <div id="branding">
                    <h1>Wrestler<span className="highlight">Outreach</span></h1>
                </div>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/dashboard">Services</Link></li>
                    </ul>
                </nav>
            </header>
            <Outlet/>
        </>
    )
};
export default Layout;