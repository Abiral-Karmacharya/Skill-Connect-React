import React, { useState } from "react";
import "../styles/registerlogin.css";
import { RegisterLogin } from "./components/TextFields";
import { ChangeLinkButton, RegisterLoginButton } from "./components/Buttons";
import toast from "react-hot-toast";

const signup = () => {
  const breaker = "---------------------or---------------------";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function submit() {
    if (!name || !email || !password || !email.includes("@")) {
      toast.error("Enter all fields");
    } else {
      toast.success(`name:${name}, email:${email}, password:${password}`);
    }
  }
  return (
    <div id="registerlogin">
      <h1 id="heading">Skill Connect</h1>
      <div id="input">
        <form onSubmit={submit}>
          <RegisterLogin
            type="text"
            placeholder="Enter your username"
            label="Username"
            name="name"
            input_style={{ left: "40px" }}
            label_style={{ left: "40px" }}
            onchange={(e) => {
              setName(e.target.value);
            }}
          ></RegisterLogin>
          <RegisterLogin
            type="text"
            placeholder="Enter your email"
            name="email"
            label="Email"
            input_style={{ top: "20px" }}
            label_style={{ left: "30px" }}
            onchange={(e) => {
              setEmail(e.target.value);
            }}
          ></RegisterLogin>
          <RegisterLogin
            type="text"
            placeholder="Enter your password"
            name="password"
            label="Password"
            label_style={{ left: "30px", top: "15px" }}
            input_style={{ top: "10px", left: "38px" }}
            onchange={(e) => {
              setPassword(e.target.value);
            }}
          ></RegisterLogin>

          <RegisterLoginButton
            label="Sign Up"
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
          label="Login"
          loc="/login"
          style={{ top: "10px" }}
        ></ChangeLinkButton>
      </div>
    </div>
  );
};

export default signup;
