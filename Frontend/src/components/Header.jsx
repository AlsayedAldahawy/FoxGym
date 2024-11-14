// Header.jsx
import React from "react";


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
                <a href="index.html" className="logo">
                  Training<em> Studio</em>
                </a>
                {/* Menu */}
                <ul className="nav">
                  <li className="scroll-to-section">
                    <a href="#top" className="active">Home</a>
                  </li>
                  <li className="scroll-to-section">
                    <a href="#features">About</a>
                  </li>
                  <li className="scroll-to-section">
                    <a href="#our-classes">Classes</a>
                  </li>
                  <li className="scroll-to-section">
                    <a href="#schedule">Schedules</a>
                  </li>
                  <li className="scroll-to-section">
                    <a href="#contact-us">Contact</a>
                  </li>
                  <li className="main-button">
                    <a href="#">Sign Up</a>
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
