import { React } from "react";
import { Link } from "react-router";
import { NormalButton } from "./Buttons";
import "../../styles/components.css";
import { Span } from "./Span";

const Nav1 = () => {
  return (
    <div id="nav">
      <input type="text" id="search-input" placeholder="Search for experts" />
      <Link to="/profile">
        <Span label="Profile"></Span>
      </Link>
    </div>
  );
};

export default Nav1;
