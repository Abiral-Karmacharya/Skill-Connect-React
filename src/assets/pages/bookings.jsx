import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    try {
      // For now, get from localStorage (replace with actual API call)
      const userBookings = JSON.parse(localStorage.getItem("userBookings") || "[]");
      setBookings(userBookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = (bookingId) => {
    try {
      const updatedBookings = bookings.map(booking =>
        booking.id === bookingId
          ? { ...booking, status: "cancelled" }
          : booking
      );
      setBookings(updatedBookings);
      localStorage.setItem("userBookings", JSON.stringify(updatedBookings));
      toast.success("Booking cancelled successfully");
    } catch (error) {
      console.error("Error cancelling booking:", error);
      toast.error("Failed to cancel booking");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (filter === "all") return true;
    return booking.status === filter;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading bookings...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">Manage your expert consultations</p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { key: "all", label: "All Bookings" },
                { key: "pending", label: "Pending" },
                { key: "confirmed", label: "Confirmed" },
                { key: "completed", label: "Completed" },
                { key: "cancelled", label: "Cancelled" }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    filter === tab.key
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                  <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2 rounded-full text-xs">
                    {tab.key === "all" ? bookings.length : bookings.filter(b => b.status === tab.key).length}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">
              {filter === "all" ? "No bookings found" : `No ${filter} bookings found`}
            </div>
            <a
              href="/experts"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Book Your First Expert
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-sm font-bold text-blue-600">
                            {booking.expertName?.charAt(0)?.toUpperCase() || "?"}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {booking.expertName}
                          </h3>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-1">Date & Time</h4>
                          <p className="text-sm text-gray-600">
                            {formatDate(booking.date)} at {formatTime(booking.time)}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-1">Duration</h4>
                          <p className="text-sm text-gray-600">{booking.duration} minutes</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-1">Contact Method</h4>
                          <p className="text-sm text-gray-600 capitalize">{booking.contactMethod}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-1">Cost</h4>
                          <p className="text-sm text-gray-600">
                            ${booking.duration === "30" ? "25" : booking.duration === "60" ? "50" : "75"}
                          </p>
                        </div>
                      </div>

                      {booking.message && (
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-gray-700 mb-1">Message</h4>
                          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                            {booking.message}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="ml-4 flex flex-col space-y-2">
                      {booking.status === "pending" && (
                        <button
                          onClick={() => handleCancelBooking(booking.id)}
                          className="px-3 py-1 text-sm text-red-600 border border-red-600 rounded-md hover:bg-red-50 transition-colors"
                        >
                          Cancel
                        </button>
                      )}
                      {booking.status === "confirmed" && (
                        <>
                          <button className="px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors">
                            Join Call
                          </button>
                          <button
                            onClick={() => handleCancelBooking(booking.id)}
                            className="px-3 py-1 text-sm text-red-600 border border-red-600 rounded-md hover:bg-red-50 transition-colors"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;