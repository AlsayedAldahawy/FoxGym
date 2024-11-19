import React, { useEffect, useState } from "react";
import PasswordModal from "../components/passwordModal.jsx";
import gymImage from "../assets/images/backgrounds/bg_login.jpg";
import mFarag from "../assets/images/users/m_farag.jpg";
import trainer from "../assets/images/users/Amir.jpg";
import trainer2 from "../assets/images/users/default.jpg";
import trainer3 from "../assets/images/users/sayed.jpg";
import femCoach from "../assets/images/users/fem.jpeg";
import "../assets/css/login.css";

export default function Login() {
  const [admins, setAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await fetch("http://localhost:5000/admin");
        const data = await response.json();
        setAdmins(data);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };
    fetchAdmins();
  }, []);

  const userImages = {
    "Mahmoud Farag": mFarag,
    "Amir Elsayed": trainer,
    "Merna Hossam": trainer2,
    "Wessam Abdelnabi": femCoach,
    "Elsayed Eldahawy": trainer3,
  };

  const handleAdminClick = (admin) => {
    setSelectedAdmin(admin);
    setPassword("");
    setErrorMessage("");
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName: selectedAdmin.userName, password }),
      });

      const result = await response.json();
      if (response.status === 200) {
        alert("Login successful!");
        setSelectedAdmin(null);
      } else {
        setErrorMessage(result || "Incorrect email or password!");
      }
    } catch (error) {
      setErrorMessage("Something went wrong!");
    }
  };

  return (
    <>
      <div className="main-banner" id="top">
        <img src={gymImage} alt="Gym background" id="bg-video" />
        <div className="video-overlay header-text">
          <div className="caption">
            <h2>
              Welcome to FOX <em>gym</em>!
            </h2>
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
          </div>
        </div>
      </div>

      {/* Password Modal */}
      <PasswordModal
        selectedAdmin={selectedAdmin}
        password={password}
        setPassword={setPassword}
        errorMessage={errorMessage}
        handleLogin={handleLogin}
        onClose={() => setSelectedAdmin(null)}
      />
    </>
  );
}
