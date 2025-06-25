import React from "react";
import "../../styles/components.css";
import { Link } from "react-router";

export const NormalButton = ({ label, onclick, style }) => {
  return (
    <div>
      <button id="normal_btn" onClick={onclick} style={style}>
        {label}
      </button>
    </div>
  );
};

export const LoginButton = ({ label, style, loc }) => {
  return (
    <div>
      <Link to={loc}>
        <button id="registerlogin_btn" style={style}>
          {label}
        </button>
      </Link>
    </div>
  );
};
