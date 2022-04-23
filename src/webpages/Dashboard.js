import React, {useEffect, useState} from "react";
import '../App.css';
import {useAuth0, withAuthenticationRequired} from '@auth0/auth0-react'
import {ContainsValue, CreateAccessProvider, CurrentToken, Lambda, parseJSON, Query, Role, Select, Var} from 'faunadb'
import useSWR from 'swr';
import handler from "../api/answers"
import {getAnswers} from "../utils";


function  Dashboard() {
    const {getAccessTokenSilently, isAuthenticated, error, isLoading} = useAuth0()
    const {user} = useAuth0();
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

    // const {data: answers} = useSWR('../api/answers.js',handler(JSON.stringify(user.email)));
    let answers;
    if (isLoading){
        return <h1>loading</h1>
    }else {
        answers = getAnswers(user.email);
        console.log("answers:",answers);
    }
    useEffect(() => {

        if (error) {
            console.log(error)
        } else if (isAuthenticated) {
            console.log("user email:");
            console.log("debugger", typeof user.name)
            console.log("database", answers);
            console.log("Token: ", getAccessTokenSilently())
        }
    })
    return (
        <div>
            {answers[0]}
        </div>
        //<button onClick={createQuestion(email,"test url", "test question")}>Test</button>

    );

}

export default Dashboard;

