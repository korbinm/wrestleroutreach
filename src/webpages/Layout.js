import { Outlet, Link } from "react-router-dom";
import React from "react";
import "../App.css";
import { useAuth0 } from "@auth0/auth0-react";

const Layout = () => {
  const { isAuthenticated } = useAuth0();
  const { loginWithRedirect, logout } = useAuth0();

  if (isAuthenticated) {
    return (
      <>
        <header>
          <div id="branding">
            <h1>
              Wrestler<span className="highlight">Outreach</span>
            </h1>
          </div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li onClick={() => logout({ returnTo: window.location.origin })}>
                LOGOUT
              </li>
            </ul>
          </nav>
        </header>
        <Outlet />
      </>
    );
  } else {
    return (
      <>
        <header>
          <div id="branding">
            <h1>
              Wrestler<span className="highlight">Outreach</span>
            </h1>
          </div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li onClick={() => loginWithRedirect()}>LOGIN</li>
            </ul>
          </nav>
        </header>
        <Outlet />
      </>
    );
  }
};
export default Layout;
