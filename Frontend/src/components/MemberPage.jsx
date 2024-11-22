// MemberPage.js

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../assets/css/memberPage.css";

import sadFox from "../assets/images/profile_pics/sad_fox.png";
import defMale from "../assets/images/profile_pics/default_m.jpeg";
import defFemale from "../assets/images/profile_pics/default_f.jpeg";

// import foxLogo from "../assets/images/not_found/foxgym_logo.png";

function MemberPage() {
  const { id } = useParams();

  // checking the id
  //   console.log("Product ID:", id);

  const [member, setMember] = useState(null);
  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/member/${id}`);
        setMember(response.data);
      } catch (error) {
        console.error("Error fetching member:", error);
      }
    };
    fetchMember();
  }, [id]);

  if (!member) {
    return (
      <>
        <div className="member-not-found">
          <div className="sad-fox">
            <img src={sadFox} alt="" />
          </div>
          <div className="four-0-4">
            <h1>404 - Not Found</h1>
            <p>
              Oops! Looks like this page decided to skip leg day, just like this
              user doesn't exist.
            </p>
          </div>
          {/* <div className="fox-gym-logo">
            <img src={foxLogo} alt="" />
            </div> */}
        </div>
      </>
    );
  }
  //   console.log(member)
  return (
    <>
      <div className="member-card">
        <div className="member-pic">
          <img
            src={`${member.gender == "Male" ? defMale : defFemale}`}
            alt=""
          />
          <h6>{member.id}</h6>
          <h6>{member.userName}</h6>
        </div>

        <div className="manage-member">
          <div className="attendance-button">
            <button>Mark Attendance</button>
          </div>
          <div className="delete-member">
            <button>Delete Member</button>
          </div>
          <div className="renew">
            <button>renew subscription</button>
          </div>
          <div className="renew">
            <button>Change Plan</button>
          </div>
        </div>
      </div>
    </>
  );
}
export default MemberPage;
