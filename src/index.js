import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./webpages/Layout.js";
import Home from "./webpages/home.js";
import Dashboard from "./webpages/Dashboard";
import Login from "./webpages/Login.js";
import Paypal from "./webpages/Paypal.js";
import ErrorPage from "./webpages/ErrorPage";
import { Auth0Provider } from "@auth0/auth0-react";
import LogoutButton from "./webpages/Logout";
import Upload from "./webpages/Upload.js";
import Form from "./webpages/Form.js";
import Confirmation from "./webpages/Confirmation.js";
import Player from "./webpages/Player.js";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="login" element={<Login />} />
          <Route path="Paypal" element={<Paypal />} />
          <Route path="Logout" element={<LogoutButton />} />
          <Route path="Upload" element={<Upload />} />
          <Route path="Form" element={<Form />} />
          <Route path="Confirmation" element={<Confirmation />} />
          <Route path="Player" element={<Player />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_APP_LOCAL___AUTH0_DOMAIN}
    clientId={process.env.REACT_APP_LOCAL___AUTH0_CLIENTID}
    audience={process.env.REACT_APP_LOCAL___AUTH0_AUDIENCE}
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);

// reportWebVitals();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
