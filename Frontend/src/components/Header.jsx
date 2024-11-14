import React from "react";
import gymVideo from "../assets/images/gym-video.mp4";  // Import video
import '../assets/css/header.css'

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
                  Fox<em> Gym</em>
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

      {/* Main Banner Area */}
      <div className="main-banner" id="top">
        <video autoplay muted loop playsinline id="bg-video">
          <source src={gymVideo} type="video/mp4" />
        </video>

        <div className="video-overlay header-text">
          <div className="caption">
            <h6>work harder, get stronger</h6>
            <h2>
              easy with Fox <em>gym</em>
            </h2>
            <div className="owner-trainer">
              <div className="main-button scroll-to-section">
                <a id="owner-trainer" href="#features">Owner</a>
              </div>
              <div className="main-button scroll-to-section">
                <a id="owner-trainer" href="#features">Trainer</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
