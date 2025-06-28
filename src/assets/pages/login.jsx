import React, { useState } from "react";
import "../styles/registerlogin.css";
import { RegisterLogin } from "./components/TextFields";
import { ChangeLinkButton, RegisterLoginButton } from "./components/Buttons";
import toast from "react-hot-toast";

const Login = () => {
  const breaker = "---------------------or---------------------";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function submit() {
    if (!email || !password || !email.includes("@")) {
      toast.error("Please fill the correct information");
    } else {
      toast.success(`email:${email}, password:${password}`);
    }
  }

  return (
    <div id="registerlogin">
      <h1 id="heading">Skill Connect</h1>
      <div id="input">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <RegisterLogin
            type="text"
            placeholder="Enter your email"
            label="Email"
            input_style={{ top: "20px" }}
            label_style={{ left: "30px" }}
            onchange={(e) => setEmail(e.target.value)}
          ></RegisterLogin>
          <RegisterLogin
            type="text"
            placeholder="Enter your password"
            label="Password"
            label_style={{ left: "30px", top: "15px" }}
            input_style={{ top: "10px", left: "38px" }}
            onchange={(e) => setPassword(e.target.value)}
          ></RegisterLogin>

          <RegisterLoginButton
            label="Login"
            style={{ top: "20px" }}
          ></RegisterLoginButton>
        </form>

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
        <ChangeLinkButton
          label="Sign Up"
          loc="/signup"
          style={{ top: "10px" }}
        ></ChangeLinkButton>
      </div>
    </div>
  );
};

export default Login;
