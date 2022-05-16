import React, { useState, useRef } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { storage } from "../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useAuth0 } from "@auth0/auth0-react";
import { createQuestion } from "../utils";

function Form() {
  const [progress, setProgress] = useState(0); //used for the progress bar
  const [url, setURL] = useState(""); //used in order to store the url of the video once submitted
  const navigate = useNavigate(); //navigate takes us to a new page
  const refQuestion = useRef(null); //contains a reference to the text box data for uploading to the chat
  const [question, getQuestion] = useState(""); //used with refQuestion to set the value of question which is exported
  const { user } = useAuth0(); //this takes the username from auth0

  //this function is called when the user submits a form
  const formHandler = (e) => {
    getQuestion(user.name + ": " + refQuestion.current.value);
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
  };

  //this function gets called to upload the user video to the cloud
  const uploadFiles = (file) => {
    if (!file) return;
    const storageRef = ref(storage, file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => setURL(url));
      }
    );
  };

  //this function submits the question to the database
  const submitQuestion = () => {
    async function createdQuestion() {
      await createQuestion(user.email, url, question, false);
    }
    createdQuestion();
  };

  return (
    <div>
      <div>
        <h1>What's Your Question?</h1>
      </div>
      <div className="App">
        <form onSubmit={formHandler}>
          <input type="file" className="input" accept="video/*" />
          <h3>Uploaded {progress} %</h3>
          <br></br>
          <textarea
            id="uploadChat"
            placeholder="What is your question?"
            rows="5"
            ref={refQuestion}
          ></textarea>
          <br></br>
          <button type="submit">Upload Video</button>
        </form>

        <div>
          {progress === 100 && url.length > 10 ? (
            <button
              onClick={() => {
                submitQuestion();
                navigate("/Confirmation");
              }}
            >
              Submit to a Coach
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Form;
