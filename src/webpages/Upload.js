import React, { useState, useRef } from "react";
import "../App.css";
import { useAuth0 } from "@auth0/auth0-react";
import Player from "./Player.js";
import { storage } from "../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

function App() {
  const inputRef = useRef(null);
  const [data, setData] = useState("");
  const { user } = useAuth0(); //this takes the username from auth0
  const [progress, setProgress] = useState(0);
  const [url, setURL] = useState("");

  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
  };

  //Sort Through this block
  //**************************************************************************************************** */
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
  /***************************************************************************************************************** */
  const onClick = () => {
    setData(data + user.name + ": " + inputRef.current.value + "\n");
  };
  return (
    <div>
      <div>
        <h1>Chat</h1>
      </div>
      <div>
        <h2>Question</h2>
        {Player(
          "https://firebasestorage.googleapis.com/v0/b/wrestleroutreach-df6f7.appspot.com/o/Wrestler%20Outreach%20-%20Google%20Chrome%202022-04-25%2019-44-07.mp4?alt=media&token=f2b9fc84-8a3a-4854-91cb-ca887885fd3b"
        )}
      </div>

      <div>
        <div id="sidebyside">
          <h2>Answer</h2>
          <div>
            <form onSubmit={formHandler}>
              <input type="file" className="input" accept="video/*" />
              <h3>Uploaded {progress} %</h3>
              <button type="submit">Upload Video</button>
            </form>
          </div>
          {Player(url)}
        </div>
        <div id="sidebyside">
          <div>
            <textarea rows="15" readonly value={data}></textarea>
          </div>
          <textarea placeholder="type here" rows="5" ref={inputRef}></textarea>
        </div>
      </div>
      <div>
        <button onClick={onClick}>Send</button>
      </div>
    </div>
  );
}
export default App;
