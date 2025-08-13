import { React, useState, useEffect } from "react";
import "../styles/dashboard-expert1.css";
import { useParams } from "react-router";
import axios from "axios";

const BookingPage = () => {
  const [expert, setExpert] = useState(null);
  const token = localStorage.getItem("token");
  const { expertId } = useParams();
  const [bookingData, setBookingData] = useState({
    projectTitle: "",
    projectDescription: "",
    budget: "",
    deadline: "",
    requirements: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchExpertDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/user/getexpert/${expertId}`
        );

        const data = await response.data;
        setExpert(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching expert details:", error);
        setIsLoading(false);
      }
    };

    if (expertId) {
      fetchExpertDetails();
    }
  }, [expertId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `http://localhost:8000/user/service`,
        {
          expertId: expertId,
          ...bookingData,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Axios automatically handles the response as JSON
      alert("Booking submitted successfully!");
      console.log("Booking result:", response.data);

      // Reset form
      setBookingData({
        projectTitle: "",
        projectDescription: "",
        budget: "",
        deadline: "",
        requirements: "",
      });
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("Failed to submit booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div id="booking-page">
        <div id="booking_container">
          <div className="loading">Loading expert details...</div>
        </div>
      </div>
    );
  }

  console.log(expert);

  if (!expert) {
    return (
      <div id="booking-page">
        <div id="booking_container">
          <div className="error">Expert not found</div>
        </div>
      </div>
    );
  }

  return (
    <div id="booking-page">
      <div id="booking_container">
        <div className="expert_info">
          <h2>Book {expert.Name}</h2>
          <p className="expert_bio">{expert.Bio}</p>
        </div>

        <form onSubmit={handleSubmit} className="booking_form">
          <h3>Project Details</h3>

          <div className="form_group">
            <label htmlFor="projectTitle">Project Title</label>
            <input
              type="text"
              id="projectTitle"
              name="projectTitle"
              value={bookingData.projectTitle}
              onChange={handleInputChange}
              required
              placeholder="Enter your project title"
            />
          </div>

          <div className="form_group">
            <label htmlFor="projectDescription">Project Description</label>
            <textarea
              id="projectDescription"
              name="projectDescription"
              value={bookingData.projectDescription}
              onChange={handleInputChange}
              required
              placeholder="Describe your project in detail"
              rows="4"
            />
          </div>

          <div className="form_group">
            <label htmlFor="budget">Budget ($)</label>
            <input
              type="number"
              id="budget"
              name="budget"
              value={bookingData.budget}
              onChange={handleInputChange}
              required
              placeholder="Enter your budget"
              min="1"
            />
          </div>

          <div className="form_group">
            <label htmlFor="deadline">Deadline</label>
            <input
              type="date"
              id="deadline"
              name="deadline"
              value={bookingData.deadline}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form_group">
            <label htmlFor="requirements">Additional Requirements</label>
            <textarea
              id="requirements"
              name="requirements"
              value={bookingData.requirements}
              onChange={handleInputChange}
              placeholder="Any special requirements or notes"
              rows="3"
            />
          </div>

          <button type="submit" className="submit_btn" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Booking Request"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
