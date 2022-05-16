import React from "react";
import "../App.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";

function Display({ id, customerVideo, responseVideo, notes, answered }) {
  const { user } = useAuth0();
  const navigate = useNavigate();

  console.log("ID:", id);
  let manager = false;
  if (
    user.email === "korbinmeink@gmail.com" ||
    user.email === "akcalebh@gmail.com"
  ) {
    manager = true;
  }
  return (
    <div>
      <td>
        {/* <Player src={customerVideo} /> */}
        <ReactPlayer controls url={customerVideo} />
      </td>
      <td>
        {answered ? (
          <ReactPlayer controls url={responseVideo} />
        ) : (
          <p>There has not been a response yet!</p>
        )}
        <button
          onClick={() =>
            navigate(`/Upload`, {
              state: {
                id: id,
                customerVideo: customerVideo,
                responseVideo: responseVideo,
                notes: notes,
              },
            })
          }
        >
          Test{" "}
        </button>
      </td>
    </div>
  );
}

export default Display;
