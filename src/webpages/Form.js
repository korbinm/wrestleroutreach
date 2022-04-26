import React, {useState, useRef, useEffect} from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { storage } from "../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import Player from "./Player";

function Form() {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const [videoURL, setUrl] = useState();
  const refQuestion = useRef(null);
  var question = ""; //this contains the question that the user has

  const formHandler = (e) => {
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
        getDownloadURL(uploadTask.snapshot.ref).then((url) => setUrl(url));
      }
    );

  };
  useEffect(()=>{
    console.log("Video URL:", videoURL)
  }, [videoURL])
  return (
    <div>
      <div>
        <h1>What's Your Question?</h1>
      </div>
      <div className="App">
        <form onSubmit={formHandler}>
          <input type="file" className="input" />
          <h3>Uploaded {progress} %</h3>
          <br></br>
          <textarea
            id="uploadChat"
            placeholder="What is your question?"
            rows="5"
            ref={refQuestion}
          ></textarea>
          <br></br>
          <button type="submit">Upload</button>
        </form>
        {Player(videoURL)}
        {/*line here which sends uploaded video to google drive acct and then gets the link to the video*/}
      </div>
    </div>
  );
}
export default Form;
