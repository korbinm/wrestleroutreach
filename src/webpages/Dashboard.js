import React, {useEffect} from "react";
import '../App.css';
import {useAuth0, withAuthenticationRequired} from '@auth0/auth0-react'
import {ContainsValue, CreateAccessProvider, CurrentToken, Lambda, parseJSON, Query, Role, Select, Var} from 'faunadb'
import {createQuestion, getAnswers} from "../utils/index.js";
import useSWR from 'swr';
import handler from "../api/answers"

function  Dashboard() {
    const {getAccessTokenSilently, isAuthenticated, error} = useAuth0()
    const {user} = useAuth0()
    // const answers = fetch("../api/answers.js");
    // let email = parseJSON(user.email);
    CreateAccessProvider(
        {
            "name": "Auth0",
            "issuer": "https://<auth0 domain>/",
            "jwks_uri": "https://<auth0 domain>/.well-known/jwks.json",
            "roles": [
                {
                    role: Role('Managers'),
                    predicate: Query(Lambda('accessToken',
                        ContainsValue('Manager', Select(["https:/db.fauna.com/roles"], Var('accessToken')))
                    ))
                },
                {
                    role: Role('Customers'),
                    predicate: Query(Lambda('accessToken',
                        ContainsValue('Customers', Select(["https:/db.fauna.com/roles"], Var('accessToken')))
                    ))
                }
            ]
        }
    )
    //const {data: answers} = useSWR('../api/answers.js',handler);

    useEffect(() => {
        if (error) {
            console.log(error)
        } else if (isAuthenticated) {
            console.log("user email:", user.email)
            // console.log("database", answers);
            console.log("Token: ", getAccessTokenSilently())
        }
    })
    return (
        <h1>hi</h1>
        //<button onClick={createQuestion(email,"test url", "test question")}>Test</button>

    )

}

export default Dashboard;

