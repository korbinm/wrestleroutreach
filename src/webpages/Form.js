import React, { useState, useRef, useEffect } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { storage } from "../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import Player from "./Player.js";
import { useAuth0 } from "@auth0/auth0-react";

function Form() {
  const [progress, setProgress] = useState(0);
  const [url, setURL] = useState("");
  const navigate = useNavigate();
  const refQuestion = useRef(null);
  const [question, getQuestion] = useState("");
  const { user } = useAuth0(); //this takes the username from auth0

  const formHandler = (e) => {
    getQuestion(user.name + ": " + refQuestion.current.value);
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
  };

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
          <div>
            <p>
              Preview. Do not submit to coach until you can watch the video
              under preview
            </p>
          </div>
          <div>{Player(url)}</div>
        </div>
        <div>
          <button
            onClick={() => {
              console.log(question); //this should be uploaded to the database instead of console.logged
              navigate("/Confirmation");
            }}
          >
            Submit to a Coach
          </button>
        </div>
      </div>
    </div>
  );
}

export default Form;
