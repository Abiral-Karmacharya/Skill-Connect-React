import { React } from "react";
import { Link } from "react-router";
import { NormalButton } from "./Buttons";
import "../../styles/components.css";
import { Span } from "./Span";

const StartNav = () => {
  return (
    <div id="start_nav">
      <h1 id="logo_heading">
        <img src="src\assets\pages\images\skill_connect.png" id="logo_img" />
        <Link to="/">
          <span style={{ color: "black" }}>Skill Connect</span>
        </Link>
      </h1>
      <Span label="Contact Us" style={{ left: "40%" }}></Span>
      <Link to="/signup">
        <Span label="Sign Up" style={{ left: "41%" }}></Span>
      </Link>
      <Link to="/login">
        <Span label="Login" style={{ left: "42%" }}></Span>
      </Link>
      <Link to="/pricing">
        <Span label="Pricing" style={{ left: "43%" }}></Span>
      </Link>
    </div>
  );
};

export default StartNav;
