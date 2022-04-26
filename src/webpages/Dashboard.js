import React, { useEffect, useState } from "react";
import "../App.css";
import { useAuth0 } from "@auth0/auth0-react";
import {
  ContainsValue,
  CreateAccessProvider,
  Lambda,
  Query,
  Role,
  Select,
  Var,
} from "faunadb";
import { getAnswers } from "../utils";
import useSWR from "swr";
import { useNavigate } from "react-router-dom";
import Display from "./displayAnswers";

function Dashboard() {
  const { isLoading } = useAuth0();
  const { user } = useAuth0();
  const navigate = useNavigate();
  // const answers = fetch("../api/answers.js");
  // let email = parseJSON(user.email);

  CreateAccessProvider({
    name: "Auth0",
    issuer: "https://<auth0 domain>/",
    jwks_uri: "https://<auth0 domain>/.well-known/jwks.json",
    roles: [
      {
        role: Role("Managers"),
        predicate: Query(
          Lambda(
            "accessToken",
            ContainsValue(
              "Manager",
              Select(["https:/db.fauna.com/roles"], Var("accessToken"))
            )
          )
        ),
      },
      {
        role: Role("Customers"),
        predicate: Query(
          Lambda(
            "accessToken",
            ContainsValue(
              "Customers",
              Select(["https:/db.fauna.com/roles"], Var("accessToken"))
            )
          )
        ),
      },
    ],
  });
  let email;
  const [answers, setAnswers] = useState([]);
  if (isLoading) {
    console.log("test");
    setAnswers([]);
    return <h1>Loading</h1>;
  } else {
    email = user.email;
  }

  const [test, setTest] = useState([]);

  useEffect(() => {
    async function fetchAnswers(){
      let holder = await getAnswers(email)
      setAnswers(holder)
    }
    fetchAnswers();
  }, [test]);

  //simple to print out
// useEffect(()=>{
//   setAnswers([1,2,3]);
// })



  console.log("Answers in effect:", answers);
  console.log("Destructure?", answers.data);

  return (
    <div>
      <div>
        <p>Pay 20$ now to ask a question to one of our expert coaches!</p>
        <button
          onClick={() => {
            navigate("/Paypal");
          }}
        >
          Pay Now
        </button>
      </div>
      {/*{answers !== [] ? Display(answers) : <h1>No videos</h1>}*/}
    </div>
    //<button onClick={createQuestion(email,"test url", "test question")}>Test</button>
  );
}

export default Dashboard;
