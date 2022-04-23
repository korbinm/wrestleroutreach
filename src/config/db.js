import faunadb from 'faunadb';

const client = new faunadb.Client({
    secret: 'fnAEk1IHIlACUAwYPwOHAQL5ZNqunA9US6NftCZJ'//don't lose this signs into the fauna database
});

const q = faunadb.query;
export {client, q};


//server key:fnAEkkvfr4ACUGQ7Za_T4X3oWzEuwRxy1XlxmOHQ
//hashed: $2a$05$qtxojSFrqwfhsUwZwB/FUe56zyIILhIgyRIPo2Qa.3ZF2IBSe9YWC

//client key: fnAEkkv_GHACULkaqhgf8I3MzB7hb2pnIXrpUH8J
//hashed: $2a$05$rNF8o.oKFcNrmMPow6Xnm.aKNIagiSIDewjEKKi9MHMeP.kKrlH8i

