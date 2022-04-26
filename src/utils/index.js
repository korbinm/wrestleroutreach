import { client } from "../config/db";

const faunadb = require("faunadb");
const q = faunadb.query;
//creates a customer field

export const updateResponseVideo = async (id, managerEmail, responseVideo, answered) => {
return await client.query(
    q.Update(
        q.Ref(q.Collection("Answers"),id),
        { data:{
            managerEmail,
            responseVideo,
            answered
          }
        }
    )
)
}

export const getQuestions = async () =>{
  const {data} = await client.query(
      q.Map(
          q.Paginate(q.Match(q.Index("unanswered_questions"), false)),
          q.Lambda("ref", q.Get(q.Var("ref")))
      )
  );
  return data
}

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

export const createQuestion = async (customerEmail, customerVideo, notes, answered) => {
  const managerEmail = "";
  const responseVideo = "";
  let data
  data = await client.query(
    q.Create(q.Collection("Answers"),
        {
      data: {
        customerEmail,
          managerEmail,
        customerVideo,
          responseVideo,
        notes,
        answered
      },
    })
  );
    const answer =data.data
  answer.id = data.ref.value.id
  return answer
};

//export const getAllCustomers;
