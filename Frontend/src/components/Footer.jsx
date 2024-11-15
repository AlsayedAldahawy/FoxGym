import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/footer.css";
import fb from "../assets/images/footer/fb.png";

const Footer = () => {
  return (
    <>
      {/* Header Area */}
      <footer>
        <div className="social-media">
          <Link to="/owner" id="owner-trainer">
            <img className="social-icon" src={fb} alt="" />
          </Link>
          <div className="social-icon"></div>
          <div className="social-icon"></div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
