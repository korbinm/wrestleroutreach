import { client } from "../config/db";

const faunadb = require("faunadb");
const q = faunadb.query;
//creates a customer field

export const userLogin = async (email, password) =>
  client
    .query(
      q.Login(q.Match(q.Index("users_by_email"), email), { password: password })
    )
    .then((ret) => console.log(ret))
    .catch((err) => console.error("Error: %s", err));

export const getAnswers = async (email) => {
  console.log("util/index hits");
  const { data } = await client.query(
    q.Map(
      q.Paginate(q.Match(q.Index("answers_by_email"), email)),
      q.Lambda("ref", q.Get(q.Var("ref")))
    )
  );
  console.log("util/index database", data);
  return data;
};

export const createQuestion = async (email, url, question) => {
  console.log("this hits");
  console.log(email, url, question);
  return await client.query(
    q.Create(q.Collection("Questions"), {
      data: {
        email,
        url,
        question,
      },
    })
  );
};

//export const getAllCustomers;
