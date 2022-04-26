import { client } from "../config/db";

const faunadb = require("faunadb");
const q = faunadb.query;
//creates a customer field

export const createAnswer = async (customerEmail, managerEmail, customerVideo, responseVideo, notes) =>{
  const answered = true;
    return await client.query(
      q.Create(q.Collection("Answers"), {
        data: {
          customerEmail,
          managerEmail,
          customerVideo,
          responseVideo,
          notes,
            answered
        }
      })
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
  const answers = data.map(answer =>{
    answer.id = answer.ref.id;
    delete answer.ref;
    return answer;
  })
  return answers;
};

export const createQuestion = async (customerEmail, customerVideo, notes, answered) => {
  const mangerEmail = null;
  const responseVideo = null;
    return await client.query(
    q.Create(q.Collection("Questions"), {
      data: {
        customerEmail,
          mangerEmail,
        customerVideo,
          responseVideo,
        notes,
        answered
      },
    })
  );
};

//export const getAllCustomers;
