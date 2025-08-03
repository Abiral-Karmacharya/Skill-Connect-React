import { React, useState } from "react";
import { Link, useNavigate } from "react-router";
import "../../styles/components.css";

const Nav1 = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Call the search function passed from parent component
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Optional: navigate to search results page if needed
    // navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div id="nav1">
      <img
        src="src/assets/pages/images/skill_connect.png"
        alt="Skill Connect Logo"
        id="nav1-img"
      />

      <form onSubmit={handleSearchSubmit} className="search-form">
        <input
          type="text"
          id="nav1-search"
          placeholder="Search for experts"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </form>

      <Link to="/logs">
        <div id="nav1-logs">
          <img
            src="src/assets/pages/images/logs.png"
            alt="Logs"
            id="nav1-logs-img"
          />
        </div>
      </Link>

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
