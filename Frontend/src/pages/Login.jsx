import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx"; // Update path as per your project
import { useNavigate } from "react-router-dom"; // Import useNavigate
import PasswordModal from "../components/passwordModal.jsx";
import UpdatePasswordModal from "../components/UpdatePasswordModal.jsx";
import gymImage from "../assets/images/backgrounds/bg_login.png";
import mFarag from "../assets/images/users/m_farag.jpg";
import trainer from "../assets/images/users/Amir.jpg";
import trainer2 from "../assets/images/users/default.jpg";
import trainer3 from "../assets/images/users/sayed.jpg";
import femCoach from "../assets/images/users/fem.jpeg";
import axios from "axios";
import "../assets/css/login.css";
import UpdateCoachInfo from "../components/UpdateCoachinfo.jsx";

export default function Login() {
  const [admins, setAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showUpdatePasswordModal, setShowUpdatePasswordModal] = useState(false);
  const [showUpdateInfoModal, setShowUpdateInfoModal] = useState(false);
  const [message, setMessage] = useState("");
  const [coach, setCoach] = useState({});
  const [filePath, setFilePath] = useState("D:\\portfolio\\db");

  const { isAuthenticated, login, logout, username } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await fetch("http://localhost:5000/admin");
        const data = await response.json();
        setAdmins(data);
        setCoach(data.find((coach) => coach.userName === username));
        // console.log("admins", data, username, "\n coach", coach);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };
    fetchAdmins();
  }, [isAuthenticated]);

  const userImages = {
    "Mahmoud Farag": mFarag,
    "Amir Elsayed": trainer,
    "Merna Hossam": trainer2,
    "Wessam Abdelnabi": femCoach,
    "Elsayed Eldahawy": trainer3,
  };

  const handleAdminClick = (admin) => {
    setSelectedAdmin(admin);
    // console.log("selected admin", selectedAdmin, admin)
    setPassword("");
    setErrorMessage("");
  };

  const handleBackup = async () => {
    if (!filePath) {
      alert("Please enter a file path.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/backup", {
        filePath,
      });
      alert(response.data.message);
    } catch (error) {
      console.error("Error during backup:", error);
      alert("Backup failed");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") handleLogin();
  };

  const handleLogin = async () => {
    if (!selectedAdmin || !password) {
      setErrorMessage("Please select a user and enter the password to login.");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName: selectedAdmin.userName, password }),
      });

      const result = await response.json();
      if (response.status === 200) {
        if (result.username && result.token) {
          login(result.username, result.token);
          // alert("Login successful!");
          setSelectedAdmin(null);

          navigate("/login"); // Navigate to home page
        } else {
          setErrorMessage("Invalid response from server.");
        }
      } else {
        setErrorMessage(result.message || "Incorrect password! Try again.");
      }
    } catch (error) {
      setErrorMessage("Something went wrong!");
    }
  };

  const handleLogout = () => {
    logout();
    setSelectedAdmin(null);
    setCoach(null);
    setPassword(""); // Clear password
    setErrorMessage(""); // Clear error message
    alert("You have been logged out.");
  };

  const handleUpdatePassword = async (oldPassword, newPassword) => {
    try {
      const response = await fetch(
        "http://localhost:5000/admin/updatePassword",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userName: username,
            oldPassword,
            newPassword,
          }),
        }
      );

      const result = await response.json();
      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error updating password:", error);
      return false;
    }
  };

  const openUpdatePasswordModal = () => {
    setShowUpdatePasswordModal(true);
  };

  const closeUpdatePasswordModal = () => {
    setShowUpdatePasswordModal(false);
  };

  const openUpdateInfoModal = () => {
    console.log("Opening update info modal");
    setShowUpdateInfoModal(true);
  };

  const closeUpdateInfoModal = () => {
    console.log("Closing update info modal");
    setShowUpdateInfoModal(false);
  };

  const handleUpdateCoachInfo = async (userName, updatedData) => {
    console.log("xxx", userName, updatedData);
    try {
      const response = await axios.post(
        "http://localhost:5000/admin/updateInfo",
        {
          userName,
          ...updatedData,
        }
      );

      if (response.status === 200) {
        setMessage("Coach information updated successfully!");
        setCoach((prev) => ({
          ...prev,
          ...updatedData,
        }));
        setShowUpdateInfoModal(false);
      } else {
        setMessage("Failed to update Coach information.");
      }
    } catch (error) {
      console.error("Error updating Coach info:", error);
      setMessage("An error occurred. Please try again.");
    }
  };
  return (
    <>
      <div className="main-banner" id="top">
        <img src={gymImage} alt="Gym background" id="bg-video" />
        <div className="video-overlay header-text">
          <div className="caption">
            {/* Show Logout if Authenticated */}
            {isAuthenticated ? (
              <div className="after-login-container">
                <h3 className="welcome-message">Welcome, {username}!</h3>
                <div className="action-buttons">
                  <button
                    onClick={openUpdatePasswordModal}
                    className="action-button"
                  >
                    Change Password
                  </button>
                  <button
                    onClick={openUpdateInfoModal}
                    className="action-button"
                  >
                    Update your Info
                  </button>
                  <button
                    onClick={handleBackup}
                    className="action-button backup-button"
                  >
                    Create Data Backup
                  </button>
                  {/* <input
                    type="text"
                    placeholder="Enter save path"
                    value={filePath}
                    onChange={(e) => setFilePath(e.target.value)}
                  /> */}
                  <button
                    onClick={handleLogout}
                    className="action-button logout-button"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="owner-trainer">
                <div className="admins">
                  {admins.slice(0, 2).map((admin, index) => (
                    <div
                      className="userButton"
                      key={index}
                      onClick={() => handleAdminClick(admin)}
                    >
                      <img
                        className="userImage"
                        src={userImages[admin.userName] || trainer2}
                        alt={admin.userName}
                      />
                      <h6 className="username">{admin.userName}</h6>
                      <h6 className="usertype">
                        {admin.type.charAt(0).toUpperCase() +
                          admin.type.slice(1)}
                      </h6>
                    </div>
                  ))}
                </div>

                <div className="border"></div>

                <div className="coaches">
                  {admins.slice(2).map((admin, index) => (
                    <div
                      className="userButton"
                      key={index}
                      onClick={() => handleAdminClick(admin)}
                    >
                      <img
                        className="userImage"
                        src={userImages[admin.userName] || trainer2}
                        alt={admin.userName}
                      />
                      <h6 className="username">{admin.userName}</h6>
                      <h6 className="usertype">
                        {admin.type.charAt(0).toUpperCase() +
                          admin.type.slice(1)}
                      </h6>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Update Password Modal */}
      {showUpdatePasswordModal && (
        <UpdatePasswordModal
          onClose={closeUpdatePasswordModal}
          onUpdatePassword={handleUpdatePassword}
        />
      )}

      {/* Update Info Modal */}
      {showUpdateInfoModal && (
        <UpdateCoachInfo
          coach={coach}
          onClose={closeUpdateInfoModal}
          onUpdate={handleUpdateCoachInfo}
        />
      )}

      {/* Password Modal */}
      {!isAuthenticated && (
        <PasswordModal
          selectedAdmin={selectedAdmin}
          password={password}
          setPassword={setPassword}
          errorMessage={errorMessage}
          handleLogin={handleLogin}
          handleKeyDown={handleKeyDown}
          onClose={() => setSelectedAdmin(null)}
        />
      )}
    </>
  );
}
