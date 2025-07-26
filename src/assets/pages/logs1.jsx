import { React, useEffect, useState } from "react";
import "../styles/logs.css";
import axios from "axios";

const LogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); // all, pending, completed, cancelled
  const [expandedLog, setExpandedLog] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Authentication token not found");
          return;
        }

        const response = await axios.get(`http://localhost:8000/user/getlogs`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLogs(response.data);
        console.log(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching logs:", err);
        setError("Failed to fetch logs. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const acceptservice = async (serviceId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8000/user/acceptservice/${serviceId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Service accepted successfully!");
    } catch (err) {
      console.error("Error accepting service:", err);
      alert("Failed to accept service. Please try again.");
    }
  };

  const declineservice = async (serviceId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:8000/user/declineservice/${serviceId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Service declined successfully!");
    } catch (err) {
      console.error("Error declining service:", err);
      alert("Failed to decline service. Please try again.");
    }
  };

  const toggleLogDetails = (serviceId) => {
    setExpandedLog(expandedLog === serviceId ? null : serviceId);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "#28a745";
      case "pending":
        return "#ffc107";
      case "in-progress":
        return "#007bff";
      case "cancelled":
        return "#dc3545";
      default:
        return "#6c757d";
    }
  };

  const filteredLogs = logs.filter((log) => {
    if (filter === "all") return true;
    return log.status?.toLowerCase() === filter;
  });

  if (isLoading) {
    return (
      <div id="logs">
        <div className="logs-loading">
          <div className="loading-spinner"></div>
          <p>Loading logs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div id="logs">
        <div className="logs-error">
          <h2>Error</h2>
          <p>{error}</p>
          <button
            className="retry-btn"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const userType = logs[0].userType;
  console.log(logs);
  return (
    <div id="logs">
      <div className="logs-header">
        <h1>{userType === "expert" ? "Expert Dashboard" : "My Bookings"}</h1>
        <p className="logs-subtitle">
          {userType === "expert"
            ? "Manage your client projects and services"
            : "Track your booking history and current projects"}
        </p>
      </div>

      <div className="logs-filters">
        <button
          className={`filter-btn ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All ({logs.length})
        </button>
        <button
          className={`filter-btn ${filter === "pending" ? "active" : ""}`}
          onClick={() => setFilter("pending")}
        >
          Pending (
          {logs.filter((log) => log.status?.toLowerCase() === "pending").length}
          )
        </button>
        <button
          className={`filter-btn ${filter === "in-progress" ? "active" : ""}`}
          onClick={() => setFilter("in-progress")}
        >
          In Progress (
          {
            logs.filter((log) => log.status?.toLowerCase() === "in-progress")
              .length
          }
          )
        </button>
        <button
          className={`filter-btn ${filter === "completed" ? "active" : ""}`}
          onClick={() => setFilter("completed")}
        >
          Completed (
          {
            logs.filter((log) => log.status?.toLowerCase() === "completed")
              .length
          }
          )
        </button>
      </div>

      <div id="logs-container">
        {filteredLogs.length === 0 ? (
          <div className="no-logs">
            <div className="no-logs-icon">📋</div>
            <h3>No {filter !== "all" ? filter : ""} logs found</h3>
            <p>
              {userType === "expert"
                ? "You haven't received any client requests yet."
                : "You haven't made any bookings yet."}
            </p>
          </div>
        ) : (
          filteredLogs.map((log) => (
            <div key={log.ServiceID} className="log-card">
              <div className="log-header">
                <h3 className="log-title">{log.Title || "Untitled Project"}</h3>
                <span
                  className="log-status"
                  style={{ backgroundColor: getStatusColor(log.status) }}
                >
                  {log.status || "Pending"}
                </span>
              </div>

              <div className="log-content">
                <div className="log-description">
                  <p>{log.Description || "No description available"}</p>
                </div>

                <div className="log-details">
                  {expandedLog === log.ServiceID && (
                    <div className="expanded-details">
                      <div className="expanded-section">
                        <h4>Additional Information</h4>
                        <div className="log-detail-item">
                          <span className="detail-label">Service ID:</span>
                          <span className="detail-value">{log.ServiceID}</span>
                        </div>
                        <div className="log-detail-item">
                          <span className="detail-label">User Type:</span>
                          <span className="detail-value">{log.userType}</span>
                        </div>
                        {log.Email && (
                          <div className="log-detail-item">
                            <span className="detail-label">Contact:</span>
                            <span className="detail-value">{log.Email}</span>
                          </div>
                        )}
                        {log.PhoneNumber && (
                          <div className="log-detail-item">
                            <span className="detail-label">Phone:</span>
                            <span className="detail-value">
                              {log.PhoneNumber}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="log-detail-item">
                    <span className="detail-label">
                      {userType === "expert" ? "Client:" : "Expert:"}
                    </span>
                    <span className="detail-value">
                      {log.Name || "Not specified"}
                    </span>
                  </div>

                  {log.Price && (
                    <div className="log-detail-item">
                      <span className="detail-label">Budget:</span>
                      <span className="detail-value">Rs{log.Price}</span>
                    </div>
                  )}

                  {log.Deadline && (
                    <div className="log-detail-item">
                      <span className="detail-label">Deadline:</span>
                      <span className="detail-value">
                        {formatDate(log.Deadline)}
                      </span>
                    </div>
                  )}

                  <div className="log-detail-item">
                    <span className="detail-label">Created:</span>
                    <span className="detail-value">
                      {formatDate(log.createdAt || log.service?.createdAt)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="log-actions">
                <button
                  className="action-btn view-btn"
                  onClick={() => {
                    toggleLogDetails(log.ServiceID);
                  }}
                >
                  {expandedLog === log.ServiceID
                    ? "Hide Details"
                    : "View Details"}
                </button>
                {log.status?.toLowerCase() === "pending" && (
                  <>
                    {userType === "expert" ? (
                      <>
                        <button
                          className="action-btn accept-btn"
                          onClick={() => {
                            acceptservice(log.ServiceID);
                          }}
                        >
                          Accept
                        </button>
                        <button
                          className="action-btn decline-btn"
                          onClick={() => {
                            declineservice(log.ServiceID);
                          }}
                        >
                          Decline
                        </button>
                      </>
                    ) : (
                      <button className="action-btn cancel-btn">Cancel</button>
                    )}
                  </>
                )}
                {log.status?.toLowerCase() === "completed" && (
                  <button className="action-btn review-btn">
                    {userType === "expert" ? "View Review" : "Leave Review"}
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LogsPage;
