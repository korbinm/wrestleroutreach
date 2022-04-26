import React from "react";

function Player(source) {
  return (
    <div>
      <div>
        <iframe width="420" height="315" src={source}></iframe>
      </div>
    </div>
  );
}

export default Player;
