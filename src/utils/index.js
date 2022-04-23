import {client} from '../config/db';
import React from 'react';
import {useAuth0} from "@auth0/auth0-react";
const faunadb = require('faunadb');
const q = faunadb.query;
//creates a customer field
const createQuestion = async (notes, url, email) => {
    return await client.query(
        q.Create(q.Collection('snippets'), {
            data: { notes, url, email },
        })
    );
};

export const userLogin = async(email, password) =>
    client.query(
        q.Login(
            q.Match(q.Index("users_by_email"), email),
            { password: password },
        )
    )
        .then((ret) => console.log(ret))
        .catch((err)=> console.error('Error: %s', err))


export const getAnswers = async(email) =>{
    const {data} = await client.query(
        q.Map(
            q.Paginate(q.Match(q.Index('answers_by_email'), email)),
            q.Lambda('ref',q.Get(q.Var('ref')))
        )
    );
    return data;
};


//export const getAllCustomers;

