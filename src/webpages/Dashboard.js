import React, {useEffect} from "react";
import '../App.css';
import {useAuth0, withAuthenticationRequired} from '@auth0/auth0-react'
import {ContainsValue, CreateAccessProvider, CurrentToken, Lambda, Query, Role, Select, Var} from 'faunadb'
import { createQuestion, getAnswers} from "../utils";

function  Dashboard() {
    const {user, getAccessTokenSilently, isAuthenticated, error,} = useAuth0()


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



    useEffect(() => {
        if (error) {
            console.log(error)
        } else if (isAuthenticated) {
            console.log("user email:", user.email)
            // console.log("user: ", getAnswers(user.email))
            console.log("Token: ", getAccessTokenSilently())

        }
    })
    return <h1>Hi</h1>

}

export default Dashboard;