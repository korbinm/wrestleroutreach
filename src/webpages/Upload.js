import React, { useState, useRef } from "react";
import "../App.css";
import { useAuth0 } from "@auth0/auth0-react";
import Player from "./Player.js";
function App() {
  const inputRef = useRef(null);
  const [data, setData] = useState("");
  const { user } = useAuth0(); //this takes the username from auth0

  const onClick = () => {
    setData(data + user.name + ": " + inputRef.current.value + "\n");
  };
  return (
    <div>
      <div>
        <h1>Chat</h1>
      </div>
      <div>
        <Player />
      </div>
      <div>
        <textarea id="chat" rows="15" readonly value={data}></textarea>
      </div>
      <textarea
        id="uploadChat"
        placeholder="type here"
        rows="5"
        ref={inputRef}
      ></textarea>
      <div>
        <button onClick={onClick}>Send</button>
      </div>
    </div>
  );
}
export default App;
