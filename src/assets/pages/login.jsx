// libraries
import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router";

// other files
import { RegisterLogin } from "./components/TextFields";
import { ChangeLinkButton, RegisterLoginButton } from "./components/Buttons";
import "../styles/registerlogin.css";

const Login = () => {
  const breaker = "---------------------or---------------------";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function submit() {
    if (!email || !password || !email.includes("@")) {
      toast.error("Please fill the correct information");
    } else {
      return true;
    }
  }

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8000/user/login", {
        email,
        password,
      });
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      toast.success(response.data.message);
      setInterval(navigate("/dashboard", { replace: true }), 1000);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div id="registerlogin">
      <h1 id="heading">Skill Connect</h1>
      <div id="input">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (submit()) {
              await handleLogin();
            }
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
