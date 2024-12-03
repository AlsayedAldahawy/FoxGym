import { useEffect, useState } from "react";
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
    if (!confirm("Are you sure you want to make a backup?"))
      return;

    if (!filePath) {
      alert("Please enter a file path.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/backup", {
        filePath,
        username,
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
    setShowUpdateInfoModal(false);
  };

  const handleUpdateCoachInfo = async (userName, updatedData) => {
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
                    <svg
                      fill="#ffffff"
                      xmlns="http://www.w3.org/2000/svg"
                      width="2em"
                      height="2em"
                      viewBox="0 0 52 52"
                      enableBackground="new 0 0 52 52"
                      xmlSpace="preserve"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <g>
                          {" "}
                          <path d="M42,23H10c-2.2,0-4,1.8-4,4v19c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4V27C46,24.8,44.2,23,42,23z M31,44.5 c-1.5,1-3.2,1.5-5,1.5c-0.6,0-1.2-0.1-1.8-0.2c-2.4-0.5-4.4-1.8-5.7-3.8l3.3-2.2c0.7,1.1,1.9,1.9,3.2,2.1c1.3,0.3,2.6,0,3.8-0.8 c2.3-1.5,2.9-4.7,1.4-6.9c-0.7-1.1-1.9-1.9-3.2-2.1c-1.3-0.3-2.6,0-3.8,0.8c-0.3,0.2-0.5,0.4-0.7,0.6L26,37h-9v-9l2.6,2.6 c0.4-0.4,0.9-0.8,1.3-1.1c2-1.3,4.4-1.8,6.8-1.4c2.4,0.5,4.4,1.8,5.7,3.8C36.2,36.1,35.1,41.7,31,44.5z"></path>{" "}
                          <path d="M10,18.1v0.4C10,18.4,10,18.3,10,18.1C10,18.1,10,18.1,10,18.1z"></path>{" "}
                          <path d="M11,19h4c0.6,0,1-0.3,1-0.9V18c0-5.7,4.9-10.4,10.7-10C32,8.4,36,13,36,18.4v-0.3c0,0.6,0.4,0.9,1,0.9h4 c0.6,0,1-0.3,1-0.9V18c0-9.1-7.6-16.4-16.8-16c-8.5,0.4-15,7.6-15.2,16.1C10.1,18.6,10.5,19,11,19z"></path>{" "}
                        </g>{" "}
                      </g>
                    </svg>
                    <span>Change Password</span>
                  </button>
                  <button
                    onClick={openUpdateInfoModal}
                    className="action-button"
                  >
                    <svg
                      name="modify"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#ffffff"
                      width="2em"
                      height="2em"
                      viewBox="0 0 32 32"
                      version="1.1"
                      xmlSpace="preserve"
                    >
                      <path d="M12.965,5.462c0,-0 -2.584,0.004 -4.979,0.008c-3.034,0.006 -5.49,2.467 -5.49,5.5l0,13.03c0,1.459 0.579,2.858 1.611,3.889c1.031,1.032 2.43,1.611 3.889,1.611l13.003,0c3.038,-0 5.5,-2.462 5.5,-5.5c0,-2.405 0,-5.004 0,-5.004c0,-0.828 -0.672,-1.5 -1.5,-1.5c-0.827,-0 -1.5,0.672 -1.5,1.5l0,5.004c0,1.381 -1.119,2.5 -2.5,2.5l-13.003,0c-0.663,-0 -1.299,-0.263 -1.768,-0.732c-0.469,-0.469 -0.732,-1.105 -0.732,-1.768l0,-13.03c0,-1.379 1.117,-2.497 2.496,-2.5c2.394,-0.004 4.979,-0.008 4.979,-0.008c0.828,-0.002 1.498,-0.675 1.497,-1.503c-0.001,-0.828 -0.675,-1.499 -1.503,-1.497Z"></path>
                      <path d="M20.046,6.411l-6.845,6.846c-0.137,0.137 -0.232,0.311 -0.271,0.501l-1.081,5.152c-0.069,0.329 0.032,0.671 0.268,0.909c0.237,0.239 0.577,0.343 0.907,0.277l5.194,-1.038c0.193,-0.039 0.371,-0.134 0.511,-0.274l6.845,-6.845l-5.528,-5.528Zm1.415,-1.414l5.527,5.528l1.112,-1.111c1.526,-1.527 1.526,-4.001 -0,-5.527c-0.001,-0 -0.001,-0.001 -0.001,-0.001c-1.527,-1.526 -4.001,-1.526 -5.527,-0l-1.111,1.111Z"></path>
                      <g id="Icon"></g>
                    </svg>
                    <span>Update your Info</span>
                  </button>
                  <button
                    onClick={handleBackup}
                    className="action-button backup-button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        width: "2em",
                        height: "2em",
                        verticalAlign: "middle",
                        fill: "currentColor",
                        overflow: "hidden",
                      }}
                      viewBox="0 0 1024 1024"
                      version="1.1"
                    >
                      <path d="M864 96a64 64 0 0 1 64 64v704a64 64 0 0 1-64 64H160a64 64 0 0 1-64-64V160a64 64 0 0 1 64-64h704z m-96 512a32 32 0 0 0-31.776 28.256L736 640v96H288v-96a32 32 0 0 0-63.776-3.744L224 640v128a32 32 0 0 0 28.256 31.776L256 800h512l3.744-0.224a32 32 0 0 0 28.032-28.032L800 768v-128a32 32 0 0 0-32-32zM512 224a32 32 0 0 0-32 32v298.048l-126.4-126.4a32 32 0 0 0-42.464-2.496l-2.784 2.496a32 32 0 0 0-2.496 42.464l2.496 2.784 181.024 181.024a32 32 0 0 0 42.464 2.496l2.784-2.496 181.024-181.024a32 32 0 0 0-42.464-47.744l-2.784 2.496-126.4 126.4V256a32 32 0 0 0-32-32z" />
                    </svg>
                    <span>Create Data Backup</span>
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      version="1.1"
                      width="2em"
                      height="2em"
                      viewBox="0 0 256 256"
                      xmlSpace="preserve"
                    >
                      <defs></defs>
                      <g
                        style={{
                          stroke: "none",
                          strokeWidth: "0",
                          strokeDasharray: "none",
                          strokeLinecap: "butt",
                          strokeLinejoin: "miter",
                          strokeMiterlimit: "10",
                          fill: "none",
                          fillRule: "nonzero",
                          opacity: "1",
                        }}
                        transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
                      >
                        <path
                          d="M 69.313 54.442 c -0.397 0 -0.798 -0.118 -1.147 -0.363 c -0.904 -0.636 -1.122 -1.883 -0.487 -2.786 l 10.118 -14.399 L 67.679 22.495 c -0.635 -0.904 -0.417 -2.151 0.487 -2.786 c 0.904 -0.637 2.151 -0.417 2.786 0.486 l 10.926 15.549 c 0.484 0.69 0.484 1.61 0 2.3 L 70.952 53.592 C 70.563 54.146 69.943 54.442 69.313 54.442 z"
                          style={{
                            stroke: "none",
                            strokeWidth: "1",
                            strokeDasharray: "none",
                            strokeLinecap: "butt",
                            strokeLinejoin: "miter",
                            strokeMiterlimit: "10",
                            fill: "#FFFFFF",
                            fillRule: "nonzero",
                            opacity: "1",
                          }}
                          transform=" matrix(1 0 0 1 0 0) "
                          strokeLinecap="round"
                        />
                        <path
                          d="M 57.693 30.092 c 1.104 0 2 -0.896 2 -2 V 2 c 0 -1.104 -0.896 -2 -2 -2 H 9.759 C 9.746 0 9.735 0.003 9.722 0.004 C 9.685 0.004 9.648 0.012 9.611 0.015 c -0.122 0.009 -0.24 0.027 -0.354 0.057 C 9.211 0.083 9.168 0.098 9.124 0.113 C 9.011 0.151 8.903 0.198 8.8 0.255 C 8.775 0.269 8.747 0.274 8.723 0.289 c -0.012 0.007 -0.02 0.018 -0.031 0.025 c -0.13 0.083 -0.252 0.177 -0.36 0.287 C 8.313 0.62 8.299 0.643 8.281 0.662 C 8.196 0.757 8.12 0.859 8.053 0.969 C 8.029 1.009 8.008 1.05 7.987 1.091 C 7.935 1.192 7.893 1.297 7.858 1.407 C 7.845 1.449 7.83 1.489 7.82 1.532 C 7.783 1.683 7.759 1.838 7.759 2 v 69.787 c 0 0.17 0.028 0.333 0.068 0.49 c 0.011 0.043 0.025 0.083 0.039 0.124 c 0.04 0.123 0.091 0.239 0.152 0.35 c 0.019 0.033 0.034 0.068 0.054 0.1 c 0.086 0.135 0.185 0.26 0.3 0.371 c 0.022 0.021 0.047 0.037 0.07 0.058 c 0.102 0.09 0.214 0.169 0.333 0.237 c 0.021 0.012 0.037 0.03 0.058 0.042 l 31.016 16.213 C 40.139 89.925 40.457 90 40.775 90 c 0.359 0 0.718 -0.097 1.036 -0.289 c 0.598 -0.362 0.964 -1.012 0.964 -1.711 V 73.787 h 14.918 c 1.104 0 2 -0.896 2 -2 V 45 c 0 -1.104 -0.896 -2 -2 -2 s -2 0.896 -2 2 v 24.787 H 42.775 V 18.213 c 0 -0.745 -0.414 -1.428 -1.074 -1.772 L 17.902 4 h 37.791 v 24.092 C 55.693 29.196 56.589 30.092 57.693 30.092 z"
                          style={{
                            stroke: "none",
                            strokeWidth: "1",
                            strokeDasharray: "none",
                            strokeLinecap: "butt",
                            strokeLinejoin: "miter",
                            strokeMiterlimit: "10",
                            fill: "#FFFFFF",
                            fillRule: "nonzero",
                            opacity: "1",
                          }}
                          transform=" matrix(1 0 0 1 0 0) "
                          strokeLinecap="round"
                        />
                        <path
                          d="M 80.241 38.894 H 47.536 c -1.104 0 -2 -0.896 -2 -2 s 0.896 -2 2 -2 h 32.705 c 1.104 0 2 0.896 2 2 S 81.346 38.894 80.241 38.894 z"
                          style={{
                            stroke: "none",
                            strokeWidth: "1",
                            strokeDasharray: "none",
                            strokeLinecap: "butt",
                            strokeLinejoin: "miter",
                            strokeMiterlimit: "10",
                            fill: "#FFFFFF",
                            fillRule: "nonzero",
                            opacity: "1",
                          }}
                          transform=" matrix(1 0 0 1 0 0) "
                          strokeLinecap="round"
                        />
                      </g>
                    </svg>
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
