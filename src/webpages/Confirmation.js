import React from "react";
import "../App.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const Confirmation = () => {
  //allows for personalizing the page for the user and navigation from the button
  const navigate = useNavigate();
  const user = useAuth0();

  return (
    <div>
      <div>
        <h1>
          Thank you {user.name} your question has been received and should be
          answered within 24 hours!
        </h1>
      </div>
      <div>
        <p>Click here to return to your dashboard.</p>
        <button
          onClick={() => {
            navigate("/Dashboard");
          }}
        >
          Dashboard
        </button>
      </div>
    </div>
  );
};
export default Confirmation;
