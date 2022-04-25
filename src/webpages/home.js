import replay from "../images/replay.png";
import arrow from "../images/arrow.png";
import play from "../images/playbutton.png";
import "../App.css";
import React from "react";

const Home = () => {
  return (
    <div className="container">
      <section id="showcase">
        <h1>Wrestling Technique Anywhere</h1>
        <p>
          Get wrestling answers from the top athletes for all coaches and
          wrestlers looking to edge their opponents
        </p>
      </section>
      <section id="boxes">
        <div className="box">
          <img src={arrow} alt={"arrow"} />
          <h3>Send Videos</h3>
          <p>
            Send us a wrestling video to get our help on any wrestling positions
            which you have found yourself without an answer.{" "}
          </p>
        </div>
        <div className="box">
          <img src={play} alt={"play"} />
          <h3>Receive Videos</h3>
          <p>
            Our guys will review and create a response personalized for you and
            your questions. Responses get sent back to you in video form.
          </p>
        </div>
        <div className="box">
          <img src={replay} alt={"replay"} />
          <h3>Replay Videos</h3>
          <p>
            Never forget what we have taught with being able to rewatch any
            videos sent to you. Videos are meant for you, to better yourself and
            perfect your craft.
          </p>
        </div>
      </section>
    </div>
  );
};
export default Home;
