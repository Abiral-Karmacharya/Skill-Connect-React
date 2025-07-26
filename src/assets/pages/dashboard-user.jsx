import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "../styles/dashboard-user.css";
import { Servicebox } from "./components/service";
const dashboard = () => {
  const { navigate } = useNavigate();
  const [experts, setExperts] = useState([]);
  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const response = await fetch("http://localhost:8000/user/getexperts");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setExperts(data);
      } catch (error) {
        console.error("Error fetching experts:", error);
      }
    };
    fetchExperts();
  }, []);

  const handleClick = (expertID) => {
    navigate(`/booking/${expertID}`);
  };
  return (
    <div id="dashboard-user">
      <div id="dashboard_user_box">
        {experts.map((expert) => (
          <Servicebox
            key={expert.UserID} // Use _id for MongoDB documents
            label={expert.Name} // Assuming the expert object has a name field
            skill={expert.Bio}
            onclick={() => handleClick(expert.UserID)}
            style={{}} // Add any custom styles here if needed
          />
        ))}
      </div>
    </div>
  );
};

export default dashboard;
