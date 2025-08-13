import { React, useEffect, useState } from "react";
import "../styles/logs.css";
import axios from "axios";

const LogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); // all, pending, completed, cancelled
  const [expandedLog, setExpandedLog] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [reviewData, setReviewData] = useState({
    rating: 5,
    comment: "",
    expertId: "",
  });

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

        // Fix: Extract the actual array from the response
        const logsData =
          response.data?.formattedServices || response.data || [];
        console.log("Response data:", response.data);
        console.log("Logs data:", logsData);

        // Ensure we have an array
        if (Array.isArray(logsData)) {
          setLogs(logsData);
        } else {
          console.error("Expected array but got:", typeof logsData, logsData);
          setLogs([]);
        }

        setError(null);
      } catch (err) {
        console.error("Error fetching logs:", err);
        setError("Failed to fetch logs. Please try again.");
        setLogs([]); // Ensure logs is always an array
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

      window.location.reload();
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

      window.location.reload();
    } catch (err) {
      console.error("Error declining service:", err);
      alert("Failed to decline service. Please try again.");
    }
  };

  const completeService = async (serviceId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:8000/user/completeservice/${serviceId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Service marked as completed successfully!");

      window.location.reload();
    } catch (err) {
      console.error("Error completing service:", err);
      alert("Failed to complete service. Please try again.");
    }
  };

  const cancelledservice = async (serviceId) => {
    console.log(serviceId);
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:8000/user/cancelledservice/${serviceId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Service marked as cancelled!");

      window.location.reload();
    } catch (err) {
      console.error("Error cancelling service:", err);
      alert("Failed to cancel service. Please try again.");
    }
  };

  const submitReview = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!reviewData.comment.trim()) {
        alert("Please enter a review comment");
        return;
      }

      await axios.post(
        `http://localhost:8000/user/submitreview`,
        {
          serviceId: selectedServiceId,
          expertId: reviewData.expertId,
          rating: reviewData.rating,
          comment: reviewData.comment.trim(),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Review submitted successfully!");
      setShowReviewModal(false);
      setReviewData({ rating: 5, comment: "", expertId: "" });
      setSelectedServiceId(null);

      // Refresh to show updated data
      window.location.reload();
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("Failed to submit review. Please try again.");
    }
  };

  const openReviewModal = (serviceId, expertId) => {
    setSelectedServiceId(serviceId);
    setReviewData({ ...reviewData, expertId: expertId });
    setShowReviewModal(true);
  };

  // Add function to view existing reviews
  const viewReviews = async (serviceId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8000/user/getreviews/${serviceId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.length > 0) {
        const reviewsText = response.data
          .map(
            (review) =>
              `Rating: ${review.Rating}/5\nComment: ${
                review.Comment
              }\nDate: ${new Date(review.CreatedAt).toLocaleDateString()}`
          )
          .join("\n\n");
        alert(`Reviews for this service:\n\n${reviewsText}`);
      } else {
        alert("No reviews found for this service.");
      }
    } catch (err) {
      console.error("Error fetching reviews:", err);
      alert("Failed to fetch reviews.");
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

  // Fix: Add safety check for array before filtering
  const filteredLogs = Array.isArray(logs)
    ? logs.filter((log) => {
        if (filter === "all") return true;
        return log.status?.toLowerCase() === filter;
      })
    : [];

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

  const userType =
    Array.isArray(logs) && logs.length > 0 ? logs[0].userType : "user";

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
          All ({Array.isArray(logs) ? logs.length : 0})
        </button>
        <button
          className={`filter-btn ${filter === "pending" ? "active" : ""}`}
          onClick={() => setFilter("pending")}
        >
          Pending (
          {Array.isArray(logs)
            ? logs.filter((log) => log.status?.toLowerCase() === "pending")
                .length
            : 0}
          )
        </button>
        <button
          className={`filter-btn ${filter === "in-progress" ? "active" : ""}`}
          onClick={() => setFilter("in-progress")}
        >
          In Progress (
          {Array.isArray(logs)
            ? logs.filter((log) => log.status?.toLowerCase() === "in-progress")
                .length
            : 0}
          )
        </button>
        <button
          className={`filter-btn ${filter === "completed" ? "active" : ""}`}
          onClick={() => setFilter("completed")}
        >
          Completed (
          {Array.isArray(logs)
            ? logs.filter((log) => log.status?.toLowerCase() === "completed")
                .length
            : 0}
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
                      <button
                        className="action-btn cancel-btn"
                        onClick={() => {
                          cancelledservice(log.ServiceID);
                        }}
                      >
                        Cancel
                      </button>
                    )}
                  </>
                )}

                {log.status?.toLowerCase() === "in-progress" &&
                  userType === "expert" && (
                    <button
                      className="action-btn complete-btn"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to mark this service as completed?"
                          )
                        ) {
                          completeService(log.ServiceID);
                        }
                      }}
                    >
                      Mark as Complete
                    </button>
                  )}

                {log.status?.toLowerCase() === "completed" && (
                  <button
                    className="action-btn review-btn"
                    onClick={() => {
                      if (userType === "expert") {
                        viewReviews(log.ServiceID);
                      } else {
                        openReviewModal(
                          log.ServiceID,
                          log.ExpertID || log.UserID
                        );
                      }
                    }}
                  >
                    {userType === "expert" ? "View Reviews" : "Leave Review"}
                  </button>
                )}
              </div>
            </div>
          ))
        )}

        {showReviewModal && (
          <div className="review-modal-overlay">
            <div className="review-modal">
              <h3>Leave a Review</h3>

              <div className="rating-section">
                <label>Rating:</label>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`star ${
                        reviewData.rating >= star ? "filled" : ""
                      }`}
                      onClick={() =>
                        setReviewData({ ...reviewData, rating: star })
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <div className="comment-section">
                <label>Your Review:</label>
                <textarea
                  className="comment-textarea"
                  placeholder="Share your experience with this expert..."
                  value={reviewData.comment}
                  onChange={(e) =>
                    setReviewData({ ...reviewData, comment: e.target.value })
                  }
                  maxLength={500}
                />
                <small style={{ color: "#666", fontSize: "12px" }}>
                  {reviewData.comment.length}/500 characters
                </small>
              </div>

              <div className="modal-actions">
                <button
                  className="modal-btn cancel-modal-btn"
                  onClick={() => {
                    setShowReviewModal(false);
                    setReviewData({ rating: 5, comment: "", expertId: "" });
                    setSelectedServiceId(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="modal-btn submit-review-btn"
                  onClick={submitReview}
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogsPage;
