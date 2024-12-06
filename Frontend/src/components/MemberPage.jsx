import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/css/memberPage.css";
import EditMemberInfo from "../components/EditMemberInfo"; // Import the EditMemberInfo component
import RenewSubscriptionModal from "../components/RenewSubscriptionModal";
import DailySessionTracker from "../components/DailySessionTracker";
import {calculatePayments} from "../assets/js/calculatePayments";

import sadFox from "../assets/images/profile_pics/sad_fox.png";
import defMale from "../assets/images/profile_pics/default_m-removebg.jpeg";
import defFemale from "../assets/images/profile_pics/default_f-removebg.jpeg";
import bg from "../assets/images/backgrounds/bg_bmi.jpg";
import {
  contactIcon,
  editIcon,

  manLift,
  personIcon,
  subIcon,
  womanLift,
  maleCross,
  femCross,
  maleTread,
  femTread,
} from "./Icons";

function MemberPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [member, setMember] = useState({});
  const [payment, setPayment] = useState({});
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
  }, [id, showEditModal]);

  useEffect(() => {
    if (member && member.program) {
      const fetchPayment = async () => {
        const paymentName = member.program;
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
            user doesn’t exist.
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
            <div className="edit-member" onClick={() => setShowEditModal(true)}>
              {editIcon}
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
              <h6 className="member-id" style={{ fontSize: "15px", fontFamily: "'Courier New', Courier, monospace;" }}>
                {member.id}
              </h6>
              <div className="info-icons">
                {" "}
                {/* {member.gender === "Male" ? maleIcon : femaleIcon} */}
                {member.program.includes("Lifting") ||
                member.program === "Mixed"
                  ? member.gender === "Male"
                    ? manLift
                    : womanLift
                  : ""}
                {member.program.includes("Cross Fit") ||
                member.program === "Mixed"
                  ? member.gender === "Male"
                    ? maleCross
                    : femCross
                  : ""}
                {member.program.includes("Cross Fit") ||
                member.program.includes("Treadmill") ||
                member.program === "Mixed"
                  ? member.gender === "Male"
                    ? maleTread
                    : femTread
                  : ""}
              </div>
            </div>

            <div className="info-column">
            </div>
            <div className="attendance">
              <DailySessionTracker member={member} />
            </div>
            <div className="grid-element">
              <div className="icon-text">
                {contactIcon}
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
          </div>
          <div className="secondary-column">
            <div className="grid-element">
              <div className="icon-text">
                {subIcon}
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
                    <span className="value red">{member.remaining || "0"}</span>{" "}
                  </h6>{" "}
                </div>
              </div>
            </div>

            <div className="grid-element">
              <div className="icon-text">
                {personIcon}
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
                    <span className="label">Age:</span>{" "}
                    <span className="value">
                      {calculateAge(member.birthDate) || "No data"}
                    </span>
                  </h6>{" "}
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
                  <h6 className="info-item">
                    <span className="label">BMI:</span>{" "}
                    <span className="value">
                      {member.weight && member.height
                        ? `${(member.weight / ((member.height * member.height) / 10000)).toFixed(2)}`
                        : "No data"}
                    </span>
                  </h6>
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
