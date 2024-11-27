import React from 'react'
import { Link } from "react-router-dom";

import gymImage from "../assets/images/backgrounds/bg01.jpg";
import '../assets/css/header.css';


export default function Home() {
  return (
    <>
        <div className="main-banner" id="top">
        <img src={gymImage} alt="Gym background" id="bg-video" />
        <div className="video-overlay header-text">
          <div className="caption">
            <h6>work harder, get stronger</h6>
            <h2>easy with Fox <em>gym</em></h2>
            {/* <div className="owner-trainer">
              <div className="main-button scroll-to-section">
                <Link to="/owner" id="owner-trainer">Owner</Link>
              </div>
              <div className="main-button scroll-to-section">
                <Link to="/trainer" id="owner-trainer">Trainer</Link>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  )
}
