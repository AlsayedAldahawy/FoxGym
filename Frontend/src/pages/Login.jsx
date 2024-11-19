import React, { useEffect, useState } from "react";
import gymImage from "../assets/images/backgrounds/bg_login.jpg";
import mFarag from "../assets/images/users/m_farag.jpg"
import trainer from "../assets/images/users/Amir.jpg"
import trainer2 from "../assets/images/users/default.jpg"
import trainer3 from "../assets/images/users/sayed.jpg"
import femCoach from "../assets/images/users/fem.jpeg"
import "../assets/css/login.css";

export default function Login() {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    // Fetch admin data from the backend
    const fetchAdmins = async () => {
      try {
        const response = await fetch("http://localhost:5000/admin");
        const data = await response.json();
        setAdmins(data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };
    fetchAdmins();
  }, []);

  // Map fetched usernames to the corresponding images
  const userImages = {
    "Mahmoud Farag": mFarag,
    "Amir Elsayed": trainer,
    "Merna Hossam": trainer2,
    "Wessam Abdelnabi": femCoach,
    "Elsayed Eldahawy": trainer3,
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
                  <div className="userButton" key={index}>
                    <div>
                      <img
                        className="userImage"
                        src={userImages[admin.userName] || trainer2}
                        alt={admin.userName}
                      />
                      <div>
                        <h6 className="username">{admin.userName}</h6>
                      </div>
                      <div>
                        <h6 className="usertype">
                          {admin.type.charAt(0).toUpperCase() + admin.type.slice(1)}
                        </h6>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border"></div>

              <div className="coaches">
                {admins.slice(2).map((admin, index) => (
                  <div className="userButton" key={index}>
                    <div>
                      <img
                        className="userImage"
                        src={userImages[admin.userName] || trainer2}
                        alt={admin.userName}
                      />
                      <div>
                        <h6 className="username">{admin.userName}</h6>
                      </div>
                      <div>
                        <h6 className="usertype">
                          {admin.type.charAt(0).toUpperCase() + admin.type.slice(1)}
                        </h6>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
