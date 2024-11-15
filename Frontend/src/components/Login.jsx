import React from "react";
import { Link } from "react-router-dom";

import gymImage from "../assets/images/bg2.jpg";
import mFarag from "../assets/images/m_farag.jpg"
import trainer from "../assets/images/Amir.jpg"
import trainer2 from "../assets/images/second-trainer.jpg"
import trainer3 from "../assets/images/third-trainer.jpg"

import defaultTrainer from "../assets/images/fox.jpg"


import "../assets/css/login.css";

export default function Login() {
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
                <div className="userButton">
                  <div>
                    <Link to="/owner" id="owner-trainer">
                      <img
                        className="userImage"
                        src={mFarag}
                        alt=""
                      />
                      <div>
                        <h6 className="username">Mahmoud Farag</h6>
                      </div>

                      <div>
                        <h6 className="usertype">Admin</h6>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="userButton">
                  <div>
                    <Link to="/owner" id="owner-trainer">
                      <img
                        className="userImage"
                        src={defaultTrainer}
                        alt=""
                      />
                      <div>
                        <h6 className="username">Guest</h6>
                      </div>

                    </Link>
                  </div>
                </div>
              </div>

              <div className="border">

              </div>
              <div className="coaches">
                <div className="userButton">
                    <Link to="/owner" id="owner-trainer">
                      <img
                        className="userImage"
                        src={trainer}
                        alt=""
                        srcSet=""
                      />
                        <div>
                        <h6 className="username">Amir Elsayed</h6>
                      </div>

                      <div>
                        <h6 className="usertype">Chief Coach</h6>
                      </div>
                    </Link>
                </div>
                <div className="userButton">
                    <Link to="/owner" id="owner-trainer">
                      <img
                        className="userImage"
                        src={trainer2}
                        alt=""
                        srcSet=""
                      />
                      <div>
                        <h6 className="username">Wessam Abdelnabi</h6>
                      </div>

                      <div>
                        <h6 className="usertype">Coach</h6>
                      </div>
                    </Link>
                </div>
                <div className="userButton">
                    <Link to="/owner" id="owner-trainer">
                      <img
                        className="userImage"
                        src={trainer3}
                        alt=""

                      />
                      <div>
                        <h6 className="username">Alsayed Aldahawy</h6>
                      </div>

                      <div>
                        <h6 className="usertype">Coach</h6>
                      </div>
                    </Link>
                </div>
                <div className="userButton">
                    <Link to="/owner" id="owner-trainer">
                      <img
                        className="userImage"
                        src={trainer2}
                      />
                      <div>
                        <h6 className="username">Merna Hossam</h6>
                      </div>

                      <div>
                        <h6 className="usertype">Coach</h6>
                      </div>
                    </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
