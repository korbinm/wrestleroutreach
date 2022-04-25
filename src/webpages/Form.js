import React, { useState, useRef, useEffect } from "react";
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
  const uploadVideo = () => {
    openPicker({
      clientId:
        "189916503967-cagikvagupmt763glh6fjaipgqr408bk.apps.googleusercontent.com",
      developerKey: "AIzaSyDGaXxHw5K6YXpOXzVzEHC3qAA_CdzUss0",
      viewId: "DRAWINGS",
      token:
        "ya29.A0ARrdaM98yp2a1lNQ69vCGf8-YlAW_chJrXCQzrLuIyiiUuszjG5K_KIcv8WcV0iwKBjw73CpJnyH-TIeq5PEwFEklkNPerxHiIdP-6qnfXJ8WUdAkbEOeaIwqf4LAPigJjiuTuipLzJ5tBgorsyYiZs1g8a2",
      showUploadView: true,
      //showUploadFolders: true,
      //supportDrives: true,
      //multiselect: false,
    });
  };

  useEffect(() => {
    if (data) {
      data.docs.map((i) => console.log(i));
    }
  }, [data]);

  return (
    <div>
      <div>
        <h1>What's Your Question?</h1>
      </div>
      <div>
        <h4>Steps to uploading a video:</h4>
      </div>
      <div>
        <p>
          1. Click upload button, navigate to the upload tab (ignoring the
          drawing tab) then select a video from your files.
        </p>
      </div>
      <div>
        <p>
          2. Once you have uploaded your video type in your question and then
          press submit.
        </p>
      </div>
      <div>
        <p>
          <strong>Important!</strong> If you have not been redirected from this
          page your video has not been submitted for review!
        </p>
      </div>
      <div>
        <button
          onClick={() => {
            uploadVideo();
          }}
        >
          Upload
        </button>
        {/*line here which sends uploaded video to google drive acct and then gets the link to the video*/}
      </div>
      <div>
        <br></br>
        <textarea
          id="uploadChat"
          placeholder="What is your question?"
          rows="5"
          ref={refQuestion}
        ></textarea>
      </div>
      <div>
        <br></br>
        <button onClick={confirm}>Send</button>
      </div>
    </div>
  );
}
export default Form;
