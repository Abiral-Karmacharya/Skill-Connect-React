import { React } from "react";
import { Link } from "react-router";
import "../../styles/components.css";

const Nav1 = () => {
  return (
    <div id="nav1">
      <img
        src="src\assets\pages\images\skill_connect.png"
        alt="hi"
        id="nav1-img"
      />
      
      <div className="flex items-center space-x-6">
        <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">
          Dashboard
        </Link>
        <Link to="/experts" className="text-gray-700 hover:text-blue-600 font-medium">
          Find Experts
        </Link>
        <Link to="/bookings" className="text-gray-700 hover:text-blue-600 font-medium">
          My Bookings
        </Link>
      </div>

      <input type="text" id="nav1-search" placeholder="Search for experts" />

      <Link to="/profile">
        <div id="nav1-profile">
          <div id="nav1-profile-img"></div>
          <p id="nav1-profile-text">Profile</p>
        </div>
      </Link>
    </div>
  );
};

export default Nav1;
