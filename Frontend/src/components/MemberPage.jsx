import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../assets/css/memberPage.css";

import sadFox from "../assets/images/profile_pics/sad_fox.png";
import defMale from "../assets/images/profile_pics/default_m.jpeg";
import defFemale from "../assets/images/profile_pics/default_f.jpeg";

function MemberPage() {
  const { id } = useParams();

  const [member, setMember] = useState(null);
  const [message, setMessage] = useState("");
  const [marked, setMarked] = useState(false);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/member/${id}`);
        setMember(response.data);
        setMarked(response.data.isMarked); // Set the initial marked state
      } catch (error) {
        console.error("Error fetching member:", error);
      }
    };
    fetchMember();
  }, [id]);
  

  const toggleAttendance = async () => {
    if (!member) return;

    try {
      const url = marked
        ? "http://localhost:5000/member/unattend" // API endpoint to remove attendance
        : "http://localhost:5000/member/attendance"; // API endpoint to add attendance

      const response = await axios.post(url, { id: member.id });
      if (response.status !== 200) {
        setMessage(response.data.message || "Error updating attendance.");
        return;
      }

      setMarked((prev) => !prev);
      setMember((prevMember) => ({
        ...prevMember,
        session: marked
          ? prevMember.session.slice(0, -1) // Remove the last attendance
          : [...prevMember.session, new Date().toISOString()], // Add a new attendance
      }));

      setMessage(
        marked
          ? "Attendance removed successfully."
          : "Attendance marked successfully."
      );

      // Reset button to "Mark Attendance" after 10 seconds
      if (!marked) {
        setTimeout(() => {
          setMarked(false);
        }, 1000); // 10 seconds delay
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setMessage(error.response.data.message);
      } else {
        console.error("Error updating attendance:", error);
        setMessage("Something went wrong.");
      }
    }
  };

  const resetAttendance = async () => {
    if (!member) return;

    try {
      const response = await axios.post(
        "http://localhost:5000/member/resetAttendance",
        { id: member.id }
      );
      if (response.status !== 200) {
        setMessage(response.data.message || "Error resetting attendance.");
        return;
      }

      setMessage("Attendance reset successfully.");
      setMember((prevMember) => ({
        ...prevMember,
        session: [],
        status: "active",
      }));
      setMarked(false); // Reset marked state
    } catch (error) {
      console.error("Error resetting attendance:", error);
      setMessage("Something went wrong.");
    }
  };

  if (!member) {
    return (
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
      </div>
    );
  }

  return (
    <>
      <div className="member-card">
        <div className="member-pic">
          <img
            src={`${member.gender === "Male" ? defMale : defFemale}`}
            alt=""
          />
          <h6>{member.id}</h6>
          <h6>{member.userName}</h6>
        </div>

        <div className="manage-member">
          {/* Mark Attendance Button */}
          <div className="attendance-button">
          {message && <p className="message">{message}</p>}

            <button
              onClick={toggleAttendance}
              style={{
                backgroundColor: marked ? "red" : "green",
                color: "white",
              }}
            >
              {marked ? "Unattend" : "Mark Attendance"}
            </button>
          </div>

          {/* Reset Attendance Button */}
          <div className="renew">
            <button
              onClick={resetAttendance}
              style={{ backgroundColor: "#ed563b", color: "white" }}
            >
              Renew Subscription
            </button>
          </div>

          {/* Delete Member Placeholder */}
          <div className="delete-member">
            <button>Delete Member</button>
          </div>

          {/* Change Plan Placeholder */}
          <div className="renew">
            <button>Change Plan</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MemberPage;
