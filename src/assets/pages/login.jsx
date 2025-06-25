import React from "react";
import "../styles/registerlogin.css";
import { RegisterLogin } from "./components/TextFields";
import { LoginButton } from "./components/Buttons";

const Login = () => {
  const breaker = "---------------------or---------------------";

  return (
    <div>
      <div id="registerlogin">
        <h1 id="heading">Skill Connect</h1>
        <div id="input">
          <RegisterLogin
            type="text"
            placeholder="Enter your email"
            name="email"
            label="Email"
            input_style={{ top: "20px" }}
            label_style={{ left: "30px" }}
          ></RegisterLogin>
          <RegisterLogin
            type="text"
            placeholder="Enter your password"
            name="password"
            label="Password"
            label_style={{ left: "30px", top: "15px" }}
            input_style={{ top: "10px", left: "38px" }}
          ></RegisterLogin>
          <div id="btn_section">
            <LoginButton label="Login" style={{ top: "20px" }}></LoginButton>
            <div
              style={{
                color: "black",
                height: "40px",
                width: "400px",
                top: "20px",
                left: "-20px",
                position: "relative",
              }}
            >
              {breaker}
            </div>
            <LoginButton
              label="Sign Up"
              loc="/signup"
              style={{ top: "10px" }}
            ></LoginButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
