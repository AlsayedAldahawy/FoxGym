// MemberPage.js

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../assets/css/memberPage.css";


import sadFox from "../assets/images/not_found/sad_fox.png";
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

            </div>
        </div>
    </>

  );
}
export default MemberPage;
