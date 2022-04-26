import React from "react";

function Player(source) {
  return (
      <div>
        <iframe allowFullScreen={true} width="420" height="315" src={source}></iframe>
      </div>
  );
}

export default Player;
