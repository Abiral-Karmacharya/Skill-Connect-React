import { React, useState, useEffect } from "react";
import "../styles/dashboard-user.css";
import { Servicebox } from "./components/service";
import { Span } from "./components/Span";
import { Link } from "react-router";
const dashboard = () => {
  const [experts, setExperts] = useState([]);
  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const response = await fetch("http://localhost:8000/user/getexpert");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setExperts(data);
      } catch (error) {
        console.error("Error fetching experts:", error);
      }
    };
    fetchExperts();
  }, []);
  return (
    <div id="dashboard-user">
      <div id="nav">
        <div id="search">
          <input
            type="text"
            id="search-input"
            placeholder="Search for experts"
          />
        </div>
        <Link to="/profile">
          <Span label="Profile"></Span>
        </Link>
      </div>
      <div id="dashboard_user_box">
        {experts.map((expert) => (
          <Servicebox
            key={expert.UserID} // Use _id for MongoDB documents
            label={expert.Name} // Assuming the expert object has a name field
            style={{}} // Add any custom styles here if needed
          />
        ))}
      </div>
    </div>
  );
};

export default dashboard;
