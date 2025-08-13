import { React } from "react";
import { Link } from "react-router";
import { NormalButton } from "./Buttons";
import "../../styles/components.css";
import { Span } from "./Span";

const StartNav = () => {
  return (
    <div id="start_nav">
      <div id="start_nav_logo">
        <img
          src="src\assets\pages\images\skill_connect.png"
          id="start_logo_img"
        />
        <h1 id="start_logo_heading">
          <Link to="/">
            <span style={{ color: "black" }}>Skill Connect</span>
          </Link>
        </h1>
      </div>
      <div id="start_links">
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
    </div>
  );
};

export default StartNav;
