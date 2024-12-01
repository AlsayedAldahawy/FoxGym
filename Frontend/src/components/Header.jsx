import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx"; // Update path as per your project

import "../assets/css/header.css";

const Header = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return (
    <>
      {/* Preloader */}
      {/* <div id="js-preloader" className="js-preloader">
        <div className="preloader-inner">
          <span className="dot"></span>
          <div className="dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div> */}

      {/* Header Area */}
      <header className="header-area header-sticky">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className="main-nav">
                {/* Logo */}
                <Link to="/" className="logo">
                  Fox<em> Gym</em>
                </Link>
                {/* Menu */}
                <ul className="nav">
                  <li className="">
                    <Link
                      to="/"
                      className={`${location.pathname == "/" || location.pathname.toLocaleLowerCase() == "/home" ? "active" : ""}`}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/bmi-calculator"
                    className={`${location.pathname.toLocaleLowerCase() == "/bmi-calculator" ? "active" : ""}`}
                    >BMI Calculator</Link>
                  </li>
                  <li className="active">
                    <Link to="/members"
                    className={`${location.pathname.toLocaleLowerCase() == "/members" ? "active" : ""}`}>Members</Link>
                  </li>
                  <li className="scroll-to-section">
                    <Link to="/coaches"
                    className={`${location.pathname.toLocaleLowerCase() == "/coaches" ? "active" : ""}`}>Coaches</Link>
                  </li>
                  {!isAuthenticated ? (
                    <li className="main-button">
                      <Link to="/login"
                      >Login</Link>
                    </li>
                  ) : (
                    <Link to="/login"
                    className={`${location.pathname.toLocaleLowerCase() == "/login" ? "active" : ""}`}>
                      <li className="loggedin-icon">
                        <svg
                          version="1.1"
                          width="40"
                          height="40"
                          fill="white"
                          viewBox="0 0 600 600"
                        >
                          <title>Profile</title>

                          <defs>
                            <clipPath id="circular-border">
                              <circle cx="300" cy="300" r="280" />
                            </clipPath>
                            <clipPath id="avoid-antialiasing-bugs">
                              <rect width="100%" height="498" />
                            </clipPath>
                          </defs>

                          <circle
                            cx="300"
                            cy="300"
                            r="280"
                            fill="#ed563b"
                            clipPath="url(#avoid-antialiasing-bugs)"
                          />
                          <circle cx="300" cy="230" r="115" />
                          <circle
                            cx="300"
                            cy="550"
                            r="205"
                            clipPath="url(#circular-border)"
                          />
                        </svg>
                      </li>
                    </Link>
                  )}
                </ul>
                <a className="menu-trigger">
                  <span>Menu</span>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
