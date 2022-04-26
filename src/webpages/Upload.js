import React, {useState, useRef, useEffect} from "react";
import "../App.css";
import { useAuth0 } from "@auth0/auth0-react";
import Player from "./Player.js";
import { storage } from "../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useNavigate, useLocation } from "react-router-dom";
import Display from "./displayAnswers";
import {updateResponseVideo} from "../utils";

const updateResponse = async(DBID, managerEmail,responseURL) =>{
    await updateResponseVideo(DBID, managerEmail,responseURL, true)
}
const updateNotes = (newNote, oldNote,name) =>
{
    const finalNote = oldNote + name + ": " + newNote;
    const navigate = useNavigate();
    console.log("Final Note", finalNote)
    navigate('/Dashboard');
}



function App(){
    const {state} = useLocation();
    const {id,customerVideo, responseVideo, notes} = state

  const { user } = useAuth0(); //this takes the username from auth0
  const [progress, setProgress] = useState(0);
  const [url, setURL] = useState("");
  const [newNote, setNewNote] = useState('')
    const[finalNote, setFinalNote] = useState('')
  const navigate = useNavigate();

    let manager = false
    if (user.email === "korbinmeink@gmail.com" || user.email ==="akcalebh@gmail.com"){
        manager = true
    }
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
          getDownloadURL(uploadTask.snapshot.ref).then((url) => setURL(url));
        }
    );
  };

  return (
      <div>
        <div>
          <h1>Chat</h1>
        </div>
        <div>
          <h2>Question</h2>
          {Player(customerVideo)}
        </div>

        <div class="uploadcontainer">
          <div class="video">
            <h2>Answer</h2>
            <div>
                {manager ? (<form onSubmit={formHandler}>
                    <input type="file" className="input" accept="video/*" />
                    <h3>Uploaded {progress} %</h3>
                    <button type="submit">Upload Video</button>
                </form>):''}

            </div>
              {responseVideo === '' ? 'no response video yet' : Player(responseVideo)}
          </div>
          <div class="chat">
            <form>
                <div>
                    <textarea rows="15" id="fillarea" readOnly value={notes}> </textarea>
                </div>
                <textarea
                    placeholder="type here"
                    name = "noted"
                    id="fillarea"
                    rows="5"
                    value = {newNote}
                    onChange ={(e)=>setNewNote(e.target.value)}
                > </textarea>
                <div>
                    <button onClick={() => updateNotes(newNote,notes,user.name)}>Chat</button>
                </div>
            </form>
          </div>
          <div>
              {progress === 100  && url.length > 10? <button
                  onClick={() => {
                      updateResponse(id,user.email,url)
                  }}
              >
                  Submit Video Answer
              </button> : ''}

          </div>
        </div>
      </div>
  );
}
export default App;