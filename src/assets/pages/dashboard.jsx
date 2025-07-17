import React from "react";
import { useNavigate } from "react-router";
import { NormalButton } from "./components/Buttons";
import { Span } from "./components/Span";
import "../styles/homepage.css";

const dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  return (
    <div>
      <div id="nav">
        <h1 id="logo_heading">
          <img src="src\assets\pages\images\skill_connect.png" id="logo_img" />
          Skill Connect
        </h1>
        <div style={{ position: "absolute", right: "20px", top: "20px", display: "flex", gap: "10px" }}>
          <NormalButton
            label="Profile"
            onclick={() => navigate("/profile")}
          />
          <NormalButton
            label="Logout"
            onclick={handleLogout}
          />
        </div>
      </div>
      <div id="home_main">
        <h1 id="home_heading">Welcome to Dashboard</h1>
        <p id="home_par">
          Manage your profile and explore
          <br />
          the platform features from here.
        </p>
      </div>
    </div>
  );
};

export default dashboard;
