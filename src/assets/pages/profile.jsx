// libraries
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router";

// other files
import { RegisterLogin } from "./components/TextFields";
import { RegisterLoginButton, NormalButton } from "./components/Buttons";
import { Span } from "../pages/components/Span";
// import "../styles/registerlogin.css";
import "../styles/profile.css";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [skills, setSkills] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Load user data on component mount
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get("http://localhost:8000/user/getuser", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = response.data;
        setName(userData.Name || "No user data");
        setEmail(userData.Email || "No user data");
        setRole(userData.Role || "No user data");
        setBio(userData.Bio || "No user data");
        setPhone(userData.PhoneNumber || "");
        setLocation(userData.Location || "No user data");
        setSkills(userData.Skills || "No user data");
        setIsLoading(false);
        console.log(userData.name);
      } catch (error) {
        console.error("Error loading user data:", error);
        toast.error("Failed to load profile data");
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [navigate]);

  const validateForm = () => {
    if (!name || !email || !email.includes("@")) {
      toast.error("Please fill in all required fields correctly");
      return false;
    }

    if (newPassword && newPassword !== confirmPassword) {
      toast.error("New passwords don't match");
      return false;
    }

    if (newPassword && !currentPassword) {
      toast.error("Please enter current password to change password");
      return false;
    }

    return true;
  };

  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const updateData = {
        name,
        email,
        bio,
        phone,
        location,
        skills,
      };

      // Only include password fields if user wants to change password
      if (newPassword) {
        updateData.currentPassword = currentPassword;
        updateData.newPassword = newPassword;
      }

      const response = await axios.put(
        "http://localhost:8000/user/updateuser",
        updateData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Profile updated successfully!");

      // Clear password fields after successful update
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete("http://localhost:8000/user/deleteuser", {
          headers: { Authorization: `Bearer ${token}` },
        });

        localStorage.removeItem("token");
        toast.success("Account deleted successfully");
        navigate("/", { replace: true });
      } catch (error) {
        console.error("Error deleting account:", error);
        toast.error("Failed to delete account");
      }
    }
  };

  if (isLoading) {
    return (
      <div id="profile-loading">
        <h2>Loading profile...</h2>
      </div>
    );
  }

  return (
    <div id="profile-container">
      <div id="profile-nav">
        <h1 id="logo_heading">
          <img src="src\assets\pages\images\skill_connect.png" id="logo_img" />
          Skill Connect
        </h1>

        <div id="nav-buttons">
          <NormalButton
            label="Dashboard"
            onclick={() => navigate("/dashboard")}
            style={{ marginRight: "10px" }}
          />
          <NormalButton
            label="Logout"
            onclick={() => {
              localStorage.removeItem("token");
              navigate("/", { replace: true });
            }}
          />
        </div>
      </div>

      <div id="profile-main">
        <div id="profile-form">
          <h1 id="profile-heading">Edit Profile</h1>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (validateForm()) {
                await handleUpdateProfile();
              }
            }}
          >
            <div id="profile-section">
              <h3 className="section-title">Basic Information</h3>

              <RegisterLogin
                type="text"
                placeholder="Enter your name"
                label="Name *"
                input_style={{ marginBottom: "15px" }}
                label_style={{ marginBottom: "5px" }}
                onchange={(e) => setName(e.target.value)}
                value={name}
              />

              <RegisterLogin
                type="email"
                placeholder="Enter your email"
                label="Email *"
                input_style={{ marginBottom: "15px" }}
                label_style={{ marginBottom: "5px" }}
                onchange={(e) => setEmail(e.target.value)}
                value={email}
              />

              <div className="form-group">
                <label id="label" style={{ marginBottom: "5px" }}>
                  Role
                </label>
                <Span label={role}></Span>
              </div>

              <RegisterLogin
                type="tel"
                placeholder="Enter your phone number"
                label="Phone"
                input_style={{ marginBottom: "15px" }}
                label_style={{ marginBottom: "5px" }}
                onchange={(e) => setPhone(e.target.value)}
                value={phone}
              />

              <RegisterLogin
                type="text"
                placeholder="Enter your location"
                label="Location"
                input_style={{ marginBottom: "15px" }}
                label_style={{ marginBottom: "5px" }}
                onchange={(e) => setLocation(e.target.value)}
                value={location}
              />
            </div>

            <div id="profile-section">
              <h3 className="section-title">Additional Information</h3>

              <div className="form-group">
                <label id="label" style={{ marginBottom: "5px" }}>
                  Bio
                </label>
                <textarea
                  id="bio-textarea"
                  placeholder="Tell us about yourself..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows="4"
                />
              </div>

              <RegisterLogin
                type="text"
                placeholder="Enter your skills (comma separated)"
                label="Skills"
                input_style={{ marginBottom: "15px" }}
                label_style={{ marginBottom: "5px" }}
                onchange={(e) => setSkills(e.target.value)}
                value={skills}
              />
            </div>

            <div id="profile-section">
              <h3 className="section-title">Change Password</h3>
              <p className="section-subtitle">
                Leave blank if you don't want to change your password
              </p>

              <RegisterLogin
                type="password"
                placeholder="Enter current password"
                label="Current Password"
                input_style={{ marginBottom: "15px" }}
                label_style={{ marginBottom: "5px" }}
                onchange={(e) => setCurrentPassword(e.target.value)}
                value={currentPassword}
              />

              <RegisterLogin
                type="password"
                placeholder="Enter new password"
                label="New Password"
                input_style={{ marginBottom: "15px" }}
                label_style={{ marginBottom: "5px" }}
                onchange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
              />

              <RegisterLogin
                type="password"
                placeholder="Confirm new password"
                label="Confirm New Password"
                input_style={{ marginBottom: "20px" }}
                label_style={{ marginBottom: "5px" }}
                onchange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </div>

            <div id="profile-buttons">
              <RegisterLoginButton
                label="Update Profile"
                style={{ marginRight: "10px" }}
              />

              <NormalButton
                label="Delete Account"
                onclick={handleDeleteAccount}
                style={{
                  backgroundColor: "#d32f2f",
                  color: "white",
                  border: "1px solid #d32f2f",
                }}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
