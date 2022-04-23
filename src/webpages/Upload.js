import React, { useEffect, useState, useRef } from "react";
import "../App.css";
import { useAuth0 } from "@auth0/auth0-react";
import {
  ContainsValue,
  CreateAccessProvider,
  CurrentToken,
  Lambda,
  Query,
  Role,
  Select,
  Var,
} from "faunadb";
import { createCustomer } from "../api";

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
        <textarea readonly value={data}></textarea>
      </div>
      <textarea
        placeholder="type here"
        rows="5"
        cols="30"
        ref={inputRef}
      ></textarea>
      <div>
        <button onClick={onClick}>Send</button>
      </div>
    </div>
  );
}
export default App;
