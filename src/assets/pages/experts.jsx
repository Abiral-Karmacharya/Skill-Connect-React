import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import BookingModal from "./components/BookingModal";

const Experts = () => {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSkill, setFilterSkill] = useState("");

  useEffect(() => {
    fetchExperts();
  }, []);

  const fetchExperts = async () => {
    try {
      const response = await fetch("http://localhost:8000/user/getexperts");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setExperts(data);
    } catch (error) {
      console.error("Error fetching experts:", error);
      toast.error("Failed to load experts");
    } finally {
      setLoading(false);
    }
  };

  const handleBookExpert = (expert) => {
    setSelectedExpert(expert);
    setShowBookingModal(true);
  };

  const handleBookingSuccess = () => {
    setShowBookingModal(false);
    setSelectedExpert(null);
    toast.success("Booking request sent successfully!");
  };

  const filteredExperts = experts.filter((expert) => {
    const matchesSearch = expert.Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expert.Bio?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkill = filterSkill === "" || expert.Bio?.toLowerCase().includes(filterSkill.toLowerCase());
    return matchesSearch && matchesSkill;
  });

  const uniqueSkills = [...new Set(experts.map(expert => expert.Bio?.split(" ")[0]).filter(Boolean))];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading experts...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Expert
          </h1>
          <p className="text-lg text-gray-600">
            Connect with skilled professionals for your projects
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Experts
              </label>
              <input
                type="text"
                placeholder="Search by name or skills..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Skill
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filterSkill}
                onChange={(e) => setFilterSkill(e.target.value)}
              >
                <option value="">All Skills</option>
                {uniqueSkills.map((skill, index) => (
                  <option key={index} value={skill}>{skill}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Experts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExperts.map((expert) => (
            <div
              key={expert.UserID}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-600">
                      {expert.Name?.charAt(0)?.toUpperCase() || "?"}
                    </span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {expert.Name || "Unknown Expert"}
                    </h3>
                    <div className="flex items-center">
                      <span className="text-yellow-400">★★★★★</span>
                      <span className="text-sm text-gray-500 ml-1">(4.8)</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Skills & Expertise</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {expert.Bio || "No description available"}
                  </p>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>Experience: 5+ years</span>
                    <span className="font-semibold text-green-600">$50/hour</span>
                  </div>
                </div>

                <button
                  onClick={() => handleBookExpert(expert)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  Book Consultation
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredExperts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">
              No experts found matching your criteria
            </div>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedExpert && (
        <BookingModal
          expert={selectedExpert}
          onClose={() => setShowBookingModal(false)}
          onSuccess={handleBookingSuccess}
        />
      )}
    </div>
  );
};

export default Experts;