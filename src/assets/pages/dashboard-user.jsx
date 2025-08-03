import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "../styles/dashboard-user.css";
import { Servicebox } from "./components/service";
import Nav1 from "./components/Nav1"; // Import your Nav component

const Dashboard = () => {
  const navigate = useNavigate();
  const [experts, setExperts] = useState([]);
  const [filteredExperts, setFilteredExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all experts on component mount
  useEffect(() => {
    const fetchExperts = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8000/user/getexperts");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setExperts(data);
        setFilteredExperts(data); // Initially show all experts
      } catch (error) {
        console.error("Error fetching experts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExperts();
  }, []);

  // Handle search from navbar
  const handleSearch = async (query) => {
    setSearchQuery(query);

    if (!query || query.trim() === "") {
      // If search is empty, show all experts
      setFilteredExperts(experts);
      return;
    }

    if (query.length < 2) {
      // Don't search for queries less than 2 characters
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/user/searchexperts?q=${encodeURIComponent(
          query
        )}`
      );
      if (!response.ok) {
        throw new Error("Search request failed");
      }
      const data = await response.json();
      setFilteredExperts(data.experts || []);
    } catch (error) {
      console.error("Error searching experts:", error);
      // Fallback to client-side filtering if API fails
      const filtered = experts.filter(
        (expert) =>
          expert.Name.toLowerCase().includes(query.toLowerCase()) ||
          (expert.Bio &&
            expert.Bio.toLowerCase().includes(query.toLowerCase())) ||
          (expert.Skills &&
            expert.Skills.toLowerCase().includes(query.toLowerCase()))
      );
      setFilteredExperts(filtered);
    }
  };

  const handleClick = (expertID) => {
    navigate(`/booking/${expertID}`);
  };

  return (
    <div>
      {/* Include the navigation bar */}
      <Nav1 onSearch={handleSearch} />

      <div id="dashboard-user">
        {/* Search results info */}
        {searchQuery && (
          <div className="search-info">
            <p>
              {filteredExperts.length > 0
                ? `Found ${filteredExperts.length} expert(s) for "${searchQuery}"`
                : `No experts found for "${searchQuery}"`}
            </p>
            {searchQuery && (
              <button
                className="clear-search-btn"
                onClick={() => handleSearch("")}
              >
                Clear Search
              </button>
            )}
          </div>
        )}

        {/* Loading state */}
        {loading ? (
          <div className="loading">Loading experts...</div>
        ) : (
          <div id="dashboard_user_box">
            {filteredExperts.length > 0 ? (
              filteredExperts.map((expert) => (
                <Servicebox
                  key={expert.UserID}
                  label={expert.Name}
                  skill={expert.Bio}
                  onclick={() => handleClick(expert.UserID)}
                  style={{}}
                />
              ))
            ) : (
              <div className="no-results">
                {searchQuery
                  ? "No experts found matching your search."
                  : "No experts available."}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
