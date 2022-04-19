import faunadb from 'faunadb';

const client = new faunadb.Client({
    secret: 'fnAEki4cULACTxTFlhGhF2biMZlBSZMg1zrn5Ir2'//don't lose this signs into the fauna database
});
const q = faunadb.query;
export {client, q};

