import faunadb from 'faunadb';

const client = new faunadb.Client({
    secret: 'fnAEki4cULACTxTFlhGhF2biMZlBSZMg1zrn5Ir2'
});
const q = faunadb.query;
export {client, q};

