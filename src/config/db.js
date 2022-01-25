import faunadb, {query as q} from 'faunadb';

const client = new faunadb.Client({
    secret: 'fnAEcn6_OwACTxzsfUgHwCuXe28UkYMGDZh34iM5'
});
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