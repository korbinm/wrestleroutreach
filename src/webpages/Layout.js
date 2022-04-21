import { Outlet, Link } from "react-router-dom";
import React, {useEffect} from "react";
import '../App.css';
import { useAuth0 } from '@auth0/auth0-react'

const Layout = () => {
    const { user, getAccessTokenSilently, isAuthenticated, error } = useAuth0()

    if (isAuthenticated){
        return(
            <>
                <header>
                    <div id="branding">
                        <h1>Wrestler<span className="highlight">Outreach</span></h1>
                    </div>
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/dashboard">Dashboard</Link></li>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/Paypal">Paypal</Link></li>
                        </ul>
                    </nav>
                </header>
                <Outlet/>
            </>
        )
    }else {
        return (
            <>
                <header>
                    <div id="branding">
                        <h1>Wrestler<span className="highlight">Outreach</span></h1>
                    </div>
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/login">Login</Link></li>
                        </ul>
                    </nav>
                </header>
                <Outlet/>
            </>
        )
    }
};
export default Layout;
