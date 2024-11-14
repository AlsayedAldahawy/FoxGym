import React from "react";
import { Link } from "react-router-dom";
import '../assets/css/header.css';

const Header = () => {
  return (
    <>
      {/* Preloader */}
      <div id="js-preloader" className="js-preloader">
        <div className="preloader-inner">
          <span className="dot"></span>
          <div className="dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      {/* Header Area */}
      <header className="header-area header-sticky">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className="main-nav">
                {/* Logo */}
                <Link to="/" className="logo">Fox<em> Gym</em></Link>
                {/* Menu */}
                <ul className="nav">
                  <li className="scroll-to-section">
                    <Link to="/" className="active">Home</Link>
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
                  <li className="main-button">
                    <Link to="/login">Login</Link>
                  </li>
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
