import React, {useEffect, useState} from "react";
import '../App.css';
import {useAuth0} from '@auth0/auth0-react'
import {ContainsValue, CreateAccessProvider, Lambda, Query, Role, Select, Var} from 'faunadb'
import {getAnswers} from "../utils";
import useSWR from 'swr'


function  Dashboard() {
    const {isLoading} = useAuth0()
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
    let email;
    if (isLoading) {
        console.log("test")
        return <h1>Loading</h1>
    }else {
        email = user.email;
    }
    const [answers, setAnswers] = useState([]);
    const[test, setTest] =useState([])

    useEffect(() =>{
        getAnswers(email).then(answers => setAnswers(answers))
    },[test])
    // const answers = getAnswers(email).then((result) => {return result});
    console.log("Answers in effect:", answers);
    const{value} = answers;
    console.log('test', value)

    return (
        <div>
            {}
        </div>
        //<button onClick={createQuestion(email,"test url", "test question")}>Test</button>

    );

}

export default Dashboard;

