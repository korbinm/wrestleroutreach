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

// export const getAnswers = async (email) => {
//
//   const result = [];
//   await client.query(
//       q.Map(
//           q.Paginate(
//               q.Match(
//                   q.Index('answers_by_email'),email
//               )
//           ),
//           q.Lambda('ref',q.Get(q.Var('ref')))
//       )
//   ).then(faunaResponse => {
//     const dataArray = faunaResponse.data;
//     dataArray.forEach(s => {
//       const data = s.data;
//       result.push({
//         id: data.id,
//         customerEmail:data.customerEmail,
//         managerEmail: data.managerEmail,
//         customerVideo: data.customerVideo,
//         responseVideo: data.responseVideo,
//         notes: data.notes,
//         answered: data.answered
//       })
//     })
//   } )
//   console.log("result id", result[0].customerEmail)
//   return result;
// }

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
  const mangerEmail = "";
  const responseVideo = "";
  let data
  data = await client.query(
    q.Create(q.Collection("Answers"),
        {
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
    const answer =data.data
  answer.id = data.ref.value.id
  return answer
};

//export const getAllCustomers;
