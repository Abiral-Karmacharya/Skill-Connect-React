import React from "react";
import "../styles/homepage.css";
import { NormalButton } from "./components/Buttons";
import { Span } from "./components/Span";
import { Link } from "react-router";
const homepage = () => {
  return (
    <div>
      <div id="nav">
        <h1 id="logo_heading">
          <img src="src\assets\pages\images\skill_connect.png" id="logo_img" />
          Skill Connect
        </h1>
        <Span label="Contact Us" style={{ left: "40%" }}></Span>
        <Link to="/signup">
          <Span label="Sign Up" style={{ left: "41%" }}></Span>
        </Link>
        <Link to="/login">
          <Span label="Login" style={{ left: "42%" }}></Span>
        </Link>
      </div>
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
        <NormalButton
          label="Get Started"
          onclick={() => {
            alert("hi");
          }}
          style={{ left: "210px", top: "60px" }}
        ></NormalButton>
        \{" "}
      </div>
    </div>
  );
};

export default homepage;
