import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/css/memberPage.css";
import EditMemberInfo from "../components/EditMemberInfo"; // Import the EditMemberInfo component
import RenewSubscriptionModal from "../components/RenewSubscriptionModal";
import DailySessionTracker from "../components/DailySessionTracker";
import calculatePayments from "../assets/js/calculatePayments";

import sadFox from "../assets/images/profile_pics/sad_fox.png";
import defMale from "../assets/images/profile_pics/default_m-removebg.jpeg";
import defFemale from "../assets/images/profile_pics/default_f-removebg.jpeg";
import bg from "../assets/images/backgrounds/bg_bmi.jpg";

function MemberPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [member, setMember] = useState(null);
  const [payment, setPayment] = useState(null);
  const [message, setMessage] = useState("");
  const [marked, setMarked] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false); // State to control modal visibility
  const [showRenewModal, setShowRenewModal] = useState(false);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/member/${id}`);
        setMember(response.data);

        // Determine if today's date is already marked
        const today = new Date().toISOString().split("T")[0];
        setMarked(response.data.session.includes(today));
      } catch (error) {
        console.error("Error fetching member:", error);
      }
    };
    fetchMember();
  }, [id]);

  useEffect(() => {
    if (member && member.program) {
      const fetchPayment = async () => {
        const paymentName = member.program;
        console.log("paymentname", paymentName);
        try {
          const response = await axios.get(
            `http://localhost:5000/payment/getPayment`,
            { params: { paymentName } }
          );
          setPayment(response.data);
        } catch (error) {
          console.error("Error fetching payment:", error);
        }
      };
      fetchPayment();
    }
  }, [member]);

  useEffect(() => {
    // Reset the marked state when the day changes
    const timer = setInterval(() => {
      const today = new Date().toISOString().split("T")[0];
      if (member) {
        const isTodayMarked = member.session.includes(today);
        setMarked(isTodayMarked);
      }
    }, 60000); // Check every minute

    return () => clearInterval(timer); // Cleanup on component unmount
  }, [member]);

  const handleEditMember = async (id, updatedData) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/member/updateInfo",
        {
          id,
          ...updatedData,
        }
      );

      if (response.status === 200) {
        setMessage("Member information updated successfully!");
        setMember((prev) => ({
          ...prev,
          ...updatedData,
        }));
        setShowEditModal(false); // Close modal after successful update
      } else {
        setMessage("Failed to update member information.");
      }
    } catch (error) {
      console.error("Error updating member info:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  const toggleAttendance = async () => {
    if (!member) return;
    console.log("id", member.id);
    try {
      const today = new Date().toISOString().split("T")[0];
      const url = marked
        ? "http://localhost:5000/member/unattend"
        : "http://localhost:5000/member/attendance";

      const response = await axios.post(url, { id: member.id });

      if (response.status !== 200) {
        setMessage(response.data.message || "Error updating attendance.");
        return;
      }

      setMarked((prev) => !prev); // Toggle the marked state
      setMember((prevMember) => ({
        ...prevMember,
        session: marked
          ? prevMember.session.filter((date) => date !== today) // Remove today's date
          : [...prevMember.session, today], // Add today's date
      }));

      setMessage(
        marked
          ? "Attendance removed successfully."
          : "Attendance marked successfully."
      );
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

  const deleteMember = async () => {
    if (!member) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete member ${member.userName}? This action cannot be undone.`
    );

    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        "http://localhost:5000/member/delete",
        {
          data: { id: member.id }, // Send the ID in the request body
        }
      );

      if (response.status !== 200) {
        setMessage(response.data.message || "Error deleting member.");
        return;
      }

      setMessage("Member deleted successfully.");
      navigate("/members"); // Navigate to another page after deletion
    } catch (error) {
      console.error("Error deleting member:", error);
      setMessage("Something went wrong.");
    }
  };

  const handleRenewSubscription = async (memberId, updatedData) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/member/renewPackage",
        {
          id: memberId,
          ...updatedData,
        }
      );
      if (response.status === 200) {
        setMember((prevMember) => ({
          ...prevMember,
          ...updatedData,
        }));

        // Call resetAttendance after successful subscription renewal
        await resetAttendance();

        return true;
      } else {
        console.error("Error renewing subscription:", response.data.message);
        return false;
      }
    } catch (error) {
      console.error("Error renewing subscription:", error);
      return false;
    }
  };

  function calculateAge(birthDateString) {
    // Split the birth date string into day, month, and year
    const [year, month, day] = birthDateString.split("-"); // Create a new Date object using the parsed values
    const birthDate = new Date(`${year}-${month}-${day}`);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    // Check if the birth month is after the current month or
    // if it's the current month but the birth day is after today
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  }

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
      <div className="background">
        <img src={bg} alt="" />
        <div className="bg-shadow"></div>
      </div>
      <div className="member-page">
        <div className="main-row">
          <div className="main-column">
            <div className="edit-member">
              <svg
                name="modify"
                onClick={() => setShowEditModal(true)}
                xmlns="http://www.w3.org/2000/svg"
                fill="#ff4800"
                width="25px"
                height="25px"
                viewBox="0 0 32 32"
                version="1.1"
                xmlSpace="preserve"
              >
                <path d="M12.965,5.462c0,-0 -2.584,0.004 -4.979,0.008c-3.034,0.006 -5.49,2.467 -5.49,5.5l0,13.03c0,1.459 0.579,2.858 1.611,3.889c1.031,1.032 2.43,1.611 3.889,1.611l13.003,0c3.038,-0 5.5,-2.462 5.5,-5.5c0,-2.405 0,-5.004 0,-5.004c0,-0.828 -0.672,-1.5 -1.5,-1.5c-0.827,-0 -1.5,0.672 -1.5,1.5l0,5.004c0,1.381 -1.119,2.5 -2.5,2.5l-13.003,0c-0.663,-0 -1.299,-0.263 -1.768,-0.732c-0.469,-0.469 -0.732,-1.105 -0.732,-1.768l0,-13.03c0,-1.379 1.117,-2.497 2.496,-2.5c2.394,-0.004 4.979,-0.008 4.979,-0.008c0.828,-0.002 1.498,-0.675 1.497,-1.503c-0.001,-0.828 -0.675,-1.499 -1.503,-1.497Z" />
                <path d="M20.046,6.411l-6.845,6.846c-0.137,0.137 -0.232,0.311 -0.271,0.501l-1.081,5.152c-0.069,0.329 0.032,0.671 0.268,0.909c0.237,0.239 0.577,0.343 0.907,0.277l5.194,-1.038c0.193,-0.039 0.371,-0.134 0.511,-0.274l6.845,-6.845l-5.528,-5.528Zm1.415,-1.414l5.527,5.528l1.112,-1.111c1.526,-1.527 1.526,-4.001 -0,-5.527c-0.001,-0 -0.001,-0.001 -0.001,-0.001c-1.527,-1.526 -4.001,-1.526 -5.527,-0l-1.111,1.111Z" />
                <g id="Icon" />
              </svg>
            </div>
            <div className="member-upper">
              <div
                className="member-pic border-changing-element"
                style={
                  member.status === "inactive" ? { borderColor: "silver" } : {}
                }
              >
                <img
                  src={`${member.gender === "Male" ? defMale : defFemale}`}
                  alt=""
                />
              </div>

              <h6 className="member-id">{member.userName}</h6>
              <h6 className="member-id" style={{ fontSize: "15px" }}>
                {member.id}
              </h6>
              <div className="info-icons">
                <svg
                  viewBox="0 0 20 20"
                  height="1em"
                  width="1em"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  fill="#5169e1"
                  stroke="#5169e1"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <title>Male</title>{" "}
                    <desc>Created with Sketch.</desc> <defs> </defs>{" "}
                    <g
                      id="Page-1"
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      {" "}
                      <g
                        id="Dribbble-Light-Preview"
                        transform="translate(-60.000000, -2079.000000)"
                        fill="#425bd7"
                      >
                        {" "}
                        <g
                          id="icons"
                          transform="translate(56.000000, 160.000000)"
                        >
                          {" "}
                          <path
                            d="M11,1937.005 C8.243,1937.005 6,1934.762 6,1932.005 C6,1929.248 8.243,1927.005 11,1927.005 C13.757,1927.005 16,1929.248 16,1932.005 C16,1934.762 13.757,1937.005 11,1937.005 L11,1937.005 Z M16,1919 L16,1921 L20.586,1921 L15.186,1926.402 C14.018,1925.527 12.572,1925.004 11,1925.004 C7.134,1925.004 4,1928.138 4,1932.004 C4,1935.87 7.134,1939.005 11,1939.005 C14.866,1939.005 18,1935.871 18,1932.005 C18,1930.433 17.475,1928.987 16.601,1927.818 L22,1922.419 L22,1927 L24,1927 L24,1919 L16,1919 Z"
                            id="male-[#425bd7]"
                          >
                            {" "}
                          </path>{" "}
                        </g>{" "}
                      </g>{" "}
                    </g>{" "}
                  </g>
                </svg>
                <svg
                  viewBox="0 0 20 20"
                  height="1em"
                  width="1em"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  fill="#5169e1"
                  stroke="#5169e1"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <title>male [#425bd7]</title>{" "}
                    <desc>Created with Sketch.</desc> <defs> </defs>{" "}
                    <g
                      id="Page-1"
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      {" "}
                      <g
                        id="Dribbble-Light-Preview"
                        transform="translate(-60.000000, -2079.000000)"
                        fill="#425bd7"
                      >
                        {" "}
                        <g
                          id="icons"
                          transform="translate(56.000000, 160.000000)"
                        >
                          {" "}
                          <path
                            d="M11,1937.005 C8.243,1937.005 6,1934.762 6,1932.005 C6,1929.248 8.243,1927.005 11,1927.005 C13.757,1927.005 16,1929.248 16,1932.005 C16,1934.762 13.757,1937.005 11,1937.005 L11,1937.005 Z M16,1919 L16,1921 L20.586,1921 L15.186,1926.402 C14.018,1925.527 12.572,1925.004 11,1925.004 C7.134,1925.004 4,1928.138 4,1932.004 C4,1935.87 7.134,1939.005 11,1939.005 C14.866,1939.005 18,1935.871 18,1932.005 C18,1930.433 17.475,1928.987 16.601,1927.818 L22,1922.419 L22,1927 L24,1927 L24,1919 L16,1919 Z"
                            id="male-[#425bd7]"
                          >
                            {" "}
                          </path>{" "}
                        </g>{" "}
                      </g>{" "}
                    </g>{" "}
                  </g>
                </svg>
                <svg
                  viewBox="0 0 20 20"
                  height="1em"
                  width="1em"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  fill="#5169e1"
                  stroke="#5169e1"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <title>male [#425bd7]</title>{" "}
                    <desc>Created with Sketch.</desc> <defs> </defs>{" "}
                    <g
                      id="Page-1"
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      {" "}
                      <g
                        id="Dribbble-Light-Preview"
                        transform="translate(-60.000000, -2079.000000)"
                        fill="#425bd7"
                      >
                        {" "}
                        <g
                          id="icons"
                          transform="translate(56.000000, 160.000000)"
                        >
                          {" "}
                          <path
                            d="M11,1937.005 C8.243,1937.005 6,1934.762 6,1932.005 C6,1929.248 8.243,1927.005 11,1927.005 C13.757,1927.005 16,1929.248 16,1932.005 C16,1934.762 13.757,1937.005 11,1937.005 L11,1937.005 Z M16,1919 L16,1921 L20.586,1921 L15.186,1926.402 C14.018,1925.527 12.572,1925.004 11,1925.004 C7.134,1925.004 4,1928.138 4,1932.004 C4,1935.87 7.134,1939.005 11,1939.005 C14.866,1939.005 18,1935.871 18,1932.005 C18,1930.433 17.475,1928.987 16.601,1927.818 L22,1922.419 L22,1927 L24,1927 L24,1919 L16,1919 Z"
                            id="male-[#425bd7]"
                          >
                            {" "}
                          </path>{" "}
                        </g>{" "}
                      </g>{" "}
                    </g>{" "}
                  </g>
                </svg>
              </div>
            </div>

            <div className="info-column">
              {member.birthDate && (
                <h6>Age: {calculateAge(member.birthDate) || "No data"}</h6>
              )}
              <h6>Gender: {member.gender || "No data"}</h6>
              <h6>
                {" "}
                Status:{" "}
                <span
                  style={{
                    color: member.status === "active" ? "green" : "red",
                  }}
                >
                  {member.status || "No data"}
                </span>
              </h6>
              {member.remaining > 0 && (
                <h6>
                  Remaining:{" "}
                  <span
                    style={{
                      color: "red",
                    }}
                  >
                    {member.remaining || "No data"}
                  </span>
                </h6>
              )}
            </div>
            <div className="attendance">
              <DailySessionTracker member={member} />
            </div>
          </div>
          <div className="secondary-column">
            <div className="grid-element">
              <div className="icon-text">
                <svg
                  fill="#ed563b"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 442 442"
                  xmlSpace="preserve"
                  stroke="#ed563b"
                  transform="matrix(1, 0, 0, 1, 0, 0)"
                  width="1.5em"
                  height="1.5em"
                  className="icon"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <g>
                      <path d="M105.4,221c0,9.391-7.609,17-17,17h-34c-9.391,0-17-7.609-17-17l0,0c0-9.391,7.609-17,17-17h34 C97.792,204,105.4,211.609,105.4,221L105.4,221z M105.4,112.2c0-9.391-7.609-17-17-17h-34c-9.391,0-17,7.609-17,17l0,0 c0,9.391,7.609,17,17,17h34C97.792,129.2,105.4,121.591,105.4,112.2L105.4,112.2z M105.4,329.801c0-9.393-7.609-17-17-17h-34 c-9.391,0-17,7.607-17,17l0,0c0,9.391,7.609,17,17,17h34C97.792,346.801,105.4,339.191,105.4,329.801L105.4,329.801z M404.6,54.4 v333.2c0,30.043-24.357,54.4-54.398,54.4h-238c-30.042,0-54.4-24.357-54.4-54.4V360.4h30.6c16.871,0,30.6-13.73,30.6-30.6 c0-16.871-13.729-30.602-30.6-30.602H57.8v-47.6h30.6c16.871,0,30.6-13.729,30.6-30.6s-13.729-30.6-30.6-30.6H57.8v-47.6h30.6 c16.871,0,30.6-13.729,30.6-30.6c0-16.871-13.729-30.6-30.6-30.6H57.8V54.4c0-30.042,24.358-54.4,54.4-54.4h238 C380.242,0,404.6,24.357,404.6,54.4z M188.945,161.255c0,28.968,23.487,52.455,52.455,52.455c28.969,0,52.455-23.487,52.455-52.455 c0-28.968-23.486-52.456-52.455-52.456C212.433,108.8,188.945,132.287,188.945,161.255z M323,289.482 c0-32.184-26.098-58.283-58.283-58.283H218.09c-32.191,0-58.29,26.1-58.29,58.283v23.318H323V289.482z"></path>
                    </g>
                  </g>
                </svg>
                <span>Contact Information</span>
              </div>
              <div className="info">
                <div className="info-row">
                  <h6 className="info-item">
                    <span className="label">Phone Number: </span>{" "}
                    <span className="value">
                      {member.phoneNumber || "No data"}
                    </span>
                  </h6>{" "}
                  <h6 className="info-item">
                    <span className="label">Email: </span>{" "}
                    <span className="value">{member.email || "No data"}</span>
                  </h6>{" "}
                </div>
              </div>
            </div>

            <div className="grid-element">
              <div className="icon-text">
                <svg
                  fill="#ed563b"
                  width="1em"
                  height="1em"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 95.469 95.469"
                  xmlSpace="preserve"
                  stroke="#ed563b"
                  className="icon"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <g>
                      <g>
                        <rect
                          x="71.875"
                          y="66.208"
                          width="5.486"
                          height="14.061"
                        ></rect>
                        <circle cx="74.619" cy="61.311" r="3.217"></circle>
                        <path d="M74.457,48.639c-6.041,0-11.475,2.579-15.311,6.672l-1.068-0.492l-4.947-4.17l-8.502,8.455l-8.523-8.455l-4.947,4.17 L20.86,59.561c-1.523,0.625-2.875,1.707-3.781,3.228L0,87.296l63.133,0.028c3.273,2.104,7.154,3.339,11.324,3.339 c11.586,0,21.012-9.427,21.012-21.013C95.468,58.065,86.043,48.639,74.457,48.639z M74.457,84.438 c-8.154,0-14.787-6.634-14.787-14.787c0-8.152,6.633-14.785,14.787-14.785c8.152,0,14.785,6.633,14.785,14.785 C89.242,77.804,82.609,84.438,74.457,84.438z"></path>
                        <path d="M44.562,51.667v0.003c0.008,0,0.02-0.002,0.029-0.002c0.004,0,0.012,0.002,0.02,0.002c0,0,0.004,0,0.006,0 c0.004,0,0.006,0,0.008,0c0.006,0,0.014-0.002,0.02-0.002c0.01,0,0.02,0.002,0.029,0.002v-0.003 c12.004,0.183,19.301-10.324,19.49-27.646C64.285,12.004,56.832,5.133,44.695,4.81V4.805c-0.02,0-0.033,0.001-0.051,0.001V4.805 c-0.012,0-0.02,0-0.027,0.001c-0.008-0.001-0.018-0.001-0.025-0.001v0.001c-0.02,0-0.033-0.001-0.049-0.001V4.81 c-12.139,0.324-19.592,7.195-19.471,19.212C25.259,41.343,32.556,51.85,44.562,51.667z"></path>
                      </g>
                    </g>
                  </g>
                </svg>
                <span>Personal Information</span>
              </div>
              <div className="info">
                <div className="info-row">
                  <h6 className="info-item">
                    <span className="label">Date of Birth: </span>
                    <span className="value">
                      {member.birthDate || "No data"}
                    </span>
                  </h6>
                  <h6 className="info-item">
                    <span className="label">BMI:</span>{" "}
                    <span className="value">
                      {member.weight && member.height
                        ? `${(member.weight / ((member.height * member.height) / 10000)).toFixed(2)}`
                        : "No data"}
                    </span>
                  </h6>
                </div>
                <div className="info-row">
                  <h6 className="info-item">
                    <span className="label">Height:</span>{" "}
                    <span className="value">
                      {member.height ? `${member.height} kg` : "No data"}
                    </span>
                  </h6>{" "}
                  <h6 className="info-item">
                    <span className="label">Weight:</span>{" "}
                    <span className="value">
                      {member.weight ? `${member.weight} kg` : "No data"}
                    </span>
                  </h6>{" "}
                </div>
              </div>
            </div>
            <div className="grid-element">
              <div className="icon-text">
                <svg
                  fill="#ed563b"
                  width="2em"
                  height="2em"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 100"
                  enableBackground="new 0 0 100 100"
                  xmlSpace="preserve"
                  className="icon"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path d="M76,42H24c-1.1,0-2,0.9-2,2v30c0,3.3,2.7,6,6,6h44c3.3,0,6-2.7,6-6V44C78,42.9,77.1,42,76,42z M40,70 c0,1.1-0.9,2-2,2h-4c-1.1,0-2-0.9-2-2v-4c0-1.1,0.9-2,2-2h4c1.1,0,2,0.9,2,2V70z M54,70c0,1.1-0.9,2-2,2h-4c-1.1,0-2-0.9-2-2v-4 c0-1.1,0.9-2,2-2h4c1.1,0,2,0.9,2,2V70z M54,56c0,1.1-0.9,2-2,2h-4c-1.1,0-2-0.9-2-2v-4c0-1.1,0.9-2,2-2h4c1.1,0,2,0.9,2,2V56z M68,56c0,1.1-0.9,2-2,2h-4c-1.1,0-2-0.9-2-2v-4c0-1.1,0.9-2,2-2h4c1.1,0,2,0.9,2,2V56z M72,26h-5v-2c0-2.2-1.8-4-4-4s-4,1.8-4,4v2 H41v-2c0-2.2-1.8-4-4-4s-4,1.8-4,4v2h-5c-3.3,0-6,2.7-6,6v2c0,1.1,0.9,2,2,2h52c1.1,0,2-0.9,2-2v-2C78,28.7,75.3,26,72,26z"></path>
                  </g>
                </svg>
                <span>Subscription Information</span>
              </div>
              <div className="info">
                <div className="info-row">
                  <h6 className="info-item">
                    {" "}
                    <span className="label">Member Since: </span>{" "}
                    <span className="value">
                      {member.joinDate || "No data"}
                    </span>{" "}
                  </h6>
                  <h6 className="info-item">
                    {" "}
                    <span className="label">Renewal Date: </span>{" "}
                    <span className="value">
                      {member.startDate || "No data"}
                    </span>{" "}
                  </h6>
                </div>
                <div className="info-row">
                  {" "}
                  <h6 className="info-item">
                    {" "}
                    <span className="label">Expiry Date: </span>{" "}
                    <span className="value">
                      {member.expiryDate || "No data"}
                    </span>{" "}
                  </h6>{" "}
                  {member.memberShip === "Semi-monthly" && (
                    <h6 className="info-item">
                      <span className="label">Remaining Days: </span>
                      <span className="value">
                        {12 - member.session.length || "No data"}
                      </span>
                    </h6>
                  )}
                </div>{" "}
                <div className="info-row">
                  {" "}
                  <h6 className="info-item">
                    {" "}
                    <span className="label">Duration: </span>{" "}
                    <span className="value">
                      {member.memberShip || "No data"}
                    </span>{" "}
                  </h6>{" "}
                  <h6 className="info-item">
                    {" "}
                    <span className="label">Program: </span>{" "}
                    <span className="value">{member.program || "No data"}</span>{" "}
                  </h6>{" "}
                </div>{" "}
                <div className="info-row">
                  {" "}
                  <h6 className="info-item">
                    {" "}
                    <span className="label">Total Fee: </span>{" "}
                    <span className="value">
                      {calculatePayments(member.program, member.memberShip) ||
                        "No data"}
                    </span>{" "}
                  </h6>{" "}
                  <h6 className="info-item">
                    {" "}
                    <span className="label">Discount: </span>{" "}
                    <span className="value">{member.discount || "0"}%</span>{" "}
                  </h6>{" "}
                  <h6 className="info-item">
                    {" "}
                    <span className="label">Due After Discount: </span>{" "}
                    <span className="value">
                      {((100 - member.discount) / 100) *
                        calculatePayments(member.program, member.memberShip) ||
                        "0"}
                    </span>{" "}
                  </h6>{" "}
                </div>{" "}
                <div className="info-row">
                  {" "}
                  <h6 className="info-item">
                    {" "}
                    <span className="label">Paid: </span>{" "}
                    <span className="value">{member.paid || "0"}</span>{" "}
                  </h6>{" "}
                  <h6 className="info-item">
                    {" "}
                    <span className="label">Remaining: </span>{" "}
                    <span className="value">{member.remaining || "0"}</span>{" "}
                  </h6>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="manage-member">
          {/* Mark Attendance Button */}
          <button
            onClick={toggleAttendance}
            disabled={member.status == "inactive"}
            style={{
              backgroundColor: marked ? "red" : "green",
              color: "white",
              height: "30",
            }}
            className={`${
              member.status == "inactive" ? "change-package-disabled" : ""
            } `}
          >
            {marked ? "Unmark Attendance" : "Mark Attendance"}
          </button>

          {/* Reset Attendance Button */}
          <button
            onClick={() => setShowRenewModal(true)}
            style={{ backgroundColor: "#ed563b", color: "white" }}
            disabled={member.status == "active"}
            className={`${
              member.status == "active" ? "change-package-disabled" : ""
            } `}
          >
            Renew Subscription
          </button>

          {/* Delete Member Button */}
          <button
            onClick={deleteMember}
            style={{ backgroundColor: "red", color: "white" }}
          >
            Delete Member
          </button>
        </div>
      </div>
      {/* Show modal when the button is clicked */}
      {showEditModal && (
        <EditMemberInfo
          member={member}
          onClose={() => setShowEditModal(false)}
          onUpdate={handleEditMember}
        />
      )}
      {showRenewModal && (
        <RenewSubscriptionModal
          member={member}
          onClose={() => setShowRenewModal(false)}
          onRenew={handleRenewSubscription}
        />
      )}
    </>
  );
}

export default MemberPage;
