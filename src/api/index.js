
import {client, q} from '../config/db';
//creates a customer field
export const createCustomer = async(email, tkn) =>
    client.query(
        q.Create(
            q.Collection('accounts'),
            {data: {
                    email,
                    tkn,
                } })
    )

        .catch((err) => console.error('Error: %s', err));

export const userLogin = async(email, password) =>
    client.query(
        q.Login(
            q.Match(q.Index("users_by_email"), email),
            { password: password },
        )
    )
        .then((ret) => console.log(ret))
        .catch((err)=> console.error('Error: %s', err))


//export const getAllCustomers;

