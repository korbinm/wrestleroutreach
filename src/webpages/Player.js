import React from "react";

function Player(source) {
  // const source =
  //   "https://firebasestorage.googleapis.com/v0/b/wrestleroutreach-df6f7.appspot.com/o/20190609_115207.mp4?alt=media&token=20457511-642c-4727-b5d6-7ac076031a27";
  return (
    <div>
      <div>
        <iframe width="420" height="315" src={source}></iframe>
      </div>
    </div>
  );
}

export default Player;
