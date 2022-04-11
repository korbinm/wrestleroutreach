import faunadb from 'faunadb';

const client = new faunadb.Client({
    secret: 'fnAEcn6_OwACTxzsfUgHwCuXe28UkYMGDZh34iM5'
});
const q = faunadb.query;
export {client, q};

