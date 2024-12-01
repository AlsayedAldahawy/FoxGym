import React from "react";

import { Link } from "react-router-dom";

import bg from "../assets/images/backgrounds/bg_bmiCalc.jpg";
import pfp from "../assets/images/profile_pics/default_m-removebg.jpeg"
import pfpf from "../assets/images/profile_pics/default_f-removebg.jpeg"
import amir from "../assets/images/users/Amir2.jpg"


import "../assets/css/coaches.css";
export default function Coaches() {
  const coaches = [
    {
      name: "Amir Elsayed",
      photo: amir,
      specialty: "Chief Coach",
      bio: "Experienced strength coach with 8 years of experience.",
    },
    {
      name: "Mohamed",
      photo: pfp,
      specialty: "Strength Coach",
      bio: "Strength and body building coach",
    },
    {
      name: "Hend Lewazy",
      photo: pfpf,
      specialty: "Strength Coach",
      bio: "Strength and Fitness coach.",
    },
    {
      name: "Amal Elsayed",
      photo: pfpf,
      specialty: "CrossFit Coach",
      bio: "CrossFit and weight loss coach.",
    },
  ];
  return (
    <>
      <div className="background">
        <img src={bg} alt="" />
        <div className="bg-shadow"></div>
      </div>
      <div className="coaches-text">
        <h6 className="typewriter-text">Our Coaches</h6>
      </div>
      <Link>
        <div className="coach-button">
          <svg
            className="settings-icon"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="122.88px"
            height="122.878px"
            viewBox="0 0 122.88 122.878"
            enableBackground="new 0 0 122.88 122.878"
            xmlSpace="preserve"
          >
            <g>
              <title>Manage Trainers</title>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M101.589,14.7l8.818,8.819c2.321,2.321,2.321,6.118,0,8.439l-7.101,7.101 c1.959,3.658,3.454,7.601,4.405,11.752h9.199c3.283,0,5.969,2.686,5.969,5.968V69.25c0,3.283-2.686,5.969-5.969,5.969h-10.039 c-1.231,4.063-2.992,7.896-5.204,11.418l6.512,6.51c2.321,2.323,2.321,6.12,0,8.44l-8.818,8.819c-2.321,2.32-6.119,2.32-8.439,0 l-7.102-7.102c-3.657,1.96-7.601,3.456-11.753,4.406v9.199c0,3.282-2.685,5.968-5.968,5.968H53.629 c-3.283,0-5.969-2.686-5.969-5.968v-10.039c-4.063-1.232-7.896-2.993-11.417-5.205l-6.511,6.512c-2.323,2.321-6.12,2.321-8.441,0 l-8.818-8.818c-2.321-2.321-2.321-6.118,0-8.439l7.102-7.102c-1.96-3.657-3.456-7.6-4.405-11.751H5.968 C2.686,72.067,0,69.382,0,66.099V53.628c0-3.283,2.686-5.968,5.968-5.968h10.039c1.232-4.063,2.993-7.896,5.204-11.418l-6.511-6.51 c-2.321-2.322-2.321-6.12,0-8.44l8.819-8.819c2.321-2.321,6.118-2.321,8.439,0l7.101,7.101c3.658-1.96,7.601-3.456,11.753-4.406 V5.969C50.812,2.686,53.498,0,56.78,0h12.471c3.282,0,5.968,2.686,5.968,5.969v10.036c4.064,1.231,7.898,2.992,11.422,5.204 l6.507-6.509C95.471,12.379,99.268,12.379,101.589,14.7L101.589,14.7z M61.44,36.92c13.54,0,24.519,10.98,24.519,24.519 c0,13.538-10.979,24.519-24.519,24.519c-13.539,0-24.519-10.98-24.519-24.519C36.921,47.9,47.901,36.92,61.44,36.92L61.44,36.92z"
              />
            </g>
          </svg>
          <h6 className="icon-text">Manage</h6>
        </div>
      </Link>
      <div className="coaches-page">
        {" "}
        <div className="coaches-container">
          {" "}
          {coaches.map((coach, index) => (
            <div key={index} className="coach-card">
              {" "}
              <div className="coach-pic">
              <img src={coach.photo} alt={`${coach.name}'s profile`} />{" "}
              </div>
              
              <div className="coach-info">
                {" "}
                <h3>{coach.name}</h3>{" "}
                <p>
                  <strong>{coach.specialty}</strong> 
                </p>{" "}
                <p>{coach.bio}</p>{" "}
              </div>{" "}
            </div>
          ))}{" "}
        </div>{" "}
      </div>
    </>
  );
}
