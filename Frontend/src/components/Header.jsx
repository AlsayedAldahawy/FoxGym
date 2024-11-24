import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx"; // Update path as per your project

import "../assets/css/header.css";


const Header = () => {
  const { isAuthenticated} = useAuth();

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
                  <li className="scroll-to-section">
                    <Link to="/" className="active">
                      Home
                    </Link>
                  </li>
                  <li className="scroll-to-section">
                    <Link to="/bmi-calculator">BMI Calculator</Link>
                  </li>
                  <li className="scroll-to-section">
                    <Link to="/members">Members</Link>
                  </li>
                  <li className="scroll-to-section">
                    <Link to="/coaches">Coaches</Link>
                  </li>
                  {!isAuthenticated ? (
                    <li className="main-button">
                      <Link to="/login">Login</Link>
                    </li>
                  ) : (
                    <Link to="/login">
                      <li className="loggedin-icon">
                        <svg
                          version="1.1"
                          width="40"
                          height="40"
                          fill="white"
                          viewBox="0 0 600 600"
                        >
                          <title>Abstract user icon</title>

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
                            fill="red"
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
