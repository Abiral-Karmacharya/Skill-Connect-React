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

export const ChangeLinkButton = ({ label, style, loc }) => {
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

export const RegisterLoginButton = ({ label, style }) => {
  return (
    <div>
      <button id="registerlogin_btn" type="submit" style={style}>
        {label}
      </button>
    </div>
  );
};
