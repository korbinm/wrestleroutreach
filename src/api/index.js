
import {client, q} from '../config/db';
export const createCustomer = async(name, email, password) =>
    client.query(
        q.Create(
            q.Collection('Customers'),
            {data: {
                    name,
                    email,
                    password
                } })
    )
        .then((ret) => console.log(ret))
        .catch((err) => console.error('Error: %s', err));
//export const getAllCustomers;
