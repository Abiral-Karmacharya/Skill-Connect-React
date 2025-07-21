import React from "react";
import { Link } from "react-router";
import "../styles/homepage.css";
import { NormalButton } from "./components/Buttons";

const homepage = () => {
  return (
    <div>
      <div id="home_main">
        <h1 id="home_heading">Find Reliable Experts.</h1>
        <p id="home_par">
          Skill Connect is a place where you
          <br />
          can find a reliable manpower to
          <br />
          complete your work in expert way.
        </p>
        <img src="src\assets\pages\images\homepage.png" id="home_img" />
        <Link to="/signup">
          <NormalButton
            label="Get Started"
            style={{ left: "210px", top: "60px" }}
          ></NormalButton>
        </Link>
      </div>
    </div>
  );
};

export default homepage;
