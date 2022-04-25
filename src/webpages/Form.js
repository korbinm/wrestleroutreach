import React, { useState, useRef } from "react";
import "../App.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import useDrivePicker from "react-google-drive-picker";

function Form() {
  //below is variable for google drive upload
  const [openPicker, data, authResponse] = useDrivePicker();

  const { user } = useAuth0(); //this takes the username from auth0
  const navigate = useNavigate();
  const refVideo = useRef(null);
  const refQuestion = useRef(null);
  var videoLink = "";
  var question = "";

  //this function will send the video link and question to the database as well as navigate to the confirmation window
  const confirm = () => {
    question = refQuestion.current;
    videoLink = refVideo.current; //Not entirely sure that this is going to work... update later
    console.log(question);
    console.log(videoLink);
    navigate("/Confirmation");
  };

  //this function will upload the video to the google drive when the user clicks the "upload" button
  const uploadVideo = () => {};

  return (
    <div>
      <div>
        <h1>What's Your Question?</h1>
      </div>
      <div>
        <p>Upload Video Here</p>
        <button onClick={uploadVideo}>Upload</button>
        {/*line here which sends uploaded video to google drive acct and then gets the link to the video*/}
      </div>
      <textarea
        id="uploadChat"
        placeholder="What is your question?"
        rows="5"
        ref={refQuestion}
      ></textarea>
      <div>
        <button onClick={confirm}>Send</button>
      </div>
    </div>
  );
}
export default Form;
