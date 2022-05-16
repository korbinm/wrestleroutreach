import React, { useEffect, useState } from "react";
import "../App.css";
import { useAuth0 } from "@auth0/auth0-react";
import { getAnswers, getQuestions } from "../utils";
import { useNavigate, useLocation } from "react-router-dom";
import Display from "./displayAnswers";

function Dashboard() {
  const { isLoading } = useAuth0();
  const { user } = useAuth0();
  const { state } = useLocation();

  const navigate = useNavigate();
  const [test, setTest] = useState([]);
  let email;
  const [answers, setAnswers] = useState([]);
  let manager = false;

  if (isLoading) {
    setAnswers([]);
    return <h1>Loading</h1>;
  } else {
    email = user.email;
  }

  if (
    user.email === "korbinmeink@gmail.com" ||
    user.email === "akcalebh@gmail.com"
  ) {
    manager = true;
  }

  if (!manager) {
    useEffect(() => {
      async function fetchAnswers() {
        let holder = await getAnswers(email);
        setAnswers(holder);
      }
      fetchAnswers();
    }, [test]);
  } else {
    useEffect(() => {
      async function fetchAnswers() {
        let holder = await getQuestions();
        setAnswers(holder);
      }
      fetchAnswers();
    }, [test]);
  }

  console.log("Dashboard:", answers);
  return (
    <div>
      {!manager ? (
        <div>
          <p>
            Welcome {user.email} pay $20 now to ask a question to one of our
            expert coaches!
          </p>
          <button
            onClick={() => {
              navigate("/Paypal");
            }}
          >
            Pay Now
          </button>
        </div>
      ) : (
        <p>Welcome {user.email} you are a manager!</p>
      )}
      <div id="videos">
        <table>
          {
            !manager && answers.length > 0 //if not a manager and has asked a question then display the questions and or answers
              ? answers.map((answer, idx) => (
                  <Display //this calls for Display from displayAnswers which will show the video and
                    key={idx}
                    id={answer.ref.value.id}
                    customerVideo={answer.data.customerVideo}
                    responseVideo={answer.data.responseVideo}
                    notes={answer.data.notes}
                    answered={answer.data.answered}
                  />
                ))
              : "No videos submitted yet" //else tell the user that there is no videos submitted yet
          }
          {manager && answers.length > 0
            ? answers.map((answer, idx) => (
                <Display
                  key={idx}
                  id={answer.ref.value.id}
                  customerVideo={answer.data.customerVideo}
                  responseVideo={answer.data.responseVideo}
                  notes={answer.data.notes}
                  answered={answer.data.answered}
                />
              ))
            : "No videos to answer yet"}
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
