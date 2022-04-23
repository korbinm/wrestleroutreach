import React, { useEffect } from "react";
import "../App.css";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import {
  ContainsValue,
  CreateAccessProvider,
  CurrentToken,
  Lambda,
  Query,
  Role,
  Select,
  Var,
} from "faunadb";
import { createQuestion, getAnswers } from "../utils";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { user, getAccessTokenSilently, isAuthenticated, error } = useAuth0();
  const navigate = useNavigate();
  CreateAccessProvider({
    name: "Auth0",
    issuer: "https://<auth0 domain>/",
    jwks_uri: "https://<auth0 domain>/.well-known/jwks.json",
    roles: [
      {
        role: Role("Managers"),
        predicate: Query(
          Lambda(
            "accessToken",
            ContainsValue(
              "Manager",
              Select(["https:/db.fauna.com/roles"], Var("accessToken"))
            )
          )
        ),
      },
      {
        role: Role("Customers"),
        predicate: Query(
          Lambda(
            "accessToken",
            ContainsValue(
              "Customers",
              Select(["https:/db.fauna.com/roles"], Var("accessToken"))
            )
          )
        ),
      },
    ],
  });

  CreateAccessProvider({
    name: "Auth0",
    issuer: "https://<auth0 domain>/",
    jwks_uri: "https://<auth0 domain>/.well-known/jwks.json",
    roles: [
      {
        role: Role("Managers"),
        predicate: Query(
          Lambda(
            "accessToken",
            ContainsValue(
              "Manager",
              Select(["https:/db.fauna.com/roles"], Var("accessToken"))
            )
          )
        ),
      },
      {
        role: Role("Customers"),
        predicate: Query(
          Lambda(
            "accessToken",
            ContainsValue(
              "Customers",
              Select(["https:/db.fauna.com/roles"], Var("accessToken"))
            )
          )
        ),
      },
    ],
  });

  useEffect(() => {
    if (error) {
      console.log(error);
    } else if (isAuthenticated) {
      console.log("user email:", user.email);
      // console.log("user: ", getAnswers(user.email))
      console.log("Token: ", getAccessTokenSilently());
    }
  });
  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <h2>Pay for a new question here:</h2>{" "}
        {/* the idea here is that you will pay through paypal and upon */}
        <button onClick={() => navigate("/Paypal")}>Pay Here</button>
        {/* confirmation of a payment you will then be directed to ask a question*/}
      </div>
    </div>
  );
}

export default Dashboard;
