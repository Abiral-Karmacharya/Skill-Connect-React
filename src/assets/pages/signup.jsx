// libraries
import React, { useState } from "react";
import { RegisterLogin } from "./components/TextFields";
import axios from "axios";
import { useNavigate } from "react-router";

// other files
import "../styles/registerlogin.css";
import toast from "react-hot-toast";
import { ChangeLinkButton, RegisterLoginButton } from "./components/Buttons";
import "../styles/components.css";
const Signup = () => {
  const breaker = "---------------------or---------------------";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  function submit() {
    if (!name || !email || !password || !email.includes("@")) {
      toast.error("Enter all fields");
    } else {
      return true;
    }
  }

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:8000/user/signup", {
        name,
        email,
        password,
        role,
      });
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      toast.success(response.data.message);
      navigate("/login", { replace: true });
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
              handleRegister();
            }
          }}
        >
          <RegisterLogin
            type="text"
            placeholder="Enter your username"
            label="Username"
            name="name"
            input_style={{ left: "40px", bottom: "30px" }}
            label_style={{ left: "40px", bottom: "30px" }}
            onchange={(e) => {
              setName(e.target.value);
            }}
          ></RegisterLogin>
          <RegisterLogin
            type="text"
            placeholder="Enter your email"
            name="email"
            label="Email"
            input_style={{ bottom: "10px" }}
            label_style={{ left: "30px", bottom: "30px" }}
            onchange={(e) => {
              setEmail(e.target.value);
            }}
          ></RegisterLogin>
          <RegisterLogin
            type="text"
            placeholder="Enter your password"
            name="password"
            label="Password"
            label_style={{ left: "30px", bottom: "10px" }}
            input_style={{ left: "38px", bottom: "10px" }}
            onchange={(e) => {
              setPassword(e.target.value);
            }}
          ></RegisterLogin>

          <select
            id="role"
            name="role"
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
            }}
            required
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="expert">Expert</option>
          </select>

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

export default Signup;
