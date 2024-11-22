import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/css/memberPage.css";

import sadFox from "../assets/images/profile_pics/sad_fox.png";
import defMale from "../assets/images/profile_pics/default_m.jpeg";
import defFemale from "../assets/images/profile_pics/default_f.jpeg";

function MemberPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [member, setMember] = useState(null);
  const [message, setMessage] = useState("");
  const [marked, setMarked] = useState(false);
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState("");

  // change package
  const [showExtraFields, setShowExtraFields] = useState(false);

  const toggleExtraFields = () => {
    setShowExtraFields(!showExtraFields);
  };

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

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/packages");
        setPackages(response.data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };
    fetchPackages();
  }, []);

  const toggleAttendance = async () => {
    if (!member) return;

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
      navigate("/"); // Navigate to another page after deletion
    } catch (error) {
      console.error("Error deleting member:", error);
      setMessage("Something went wrong.");
    }
  };

  const handlePackageChange = (e) => {
    const newPackage = e.target.value;
    setSelectedPackage(newPackage);
  };

  const handleSubmitting = async (e) => {
    e.preventDefault();

    const confirmDelete = window.confirm(
      `Are you sure you want to change the package to ${selectedPackage}? This action cannot be undone.`
    );

    if (!confirmDelete) return;

    const newPackage = selectedPackage;

    try {
      const response = await axios.post(
        "http://localhost:5000/member/changePackage",
        {
          id: member.id,
          newPackage,
        }
      );

      if (response.status === 200) {
        setMessage("Package changed successfully.");
        setMember((prevMember) => ({
          ...prevMember,
          memberShip: newPackage,
        }));
      } else {
        setMessage(response.data.message || "Error changing package.");
      }
    } catch (error) {
      console.error("Error changing package:", error);
      setMessage("Something went wrong.");
    }

    resetAttendance();
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
          <h6 className="member-id">{member.id}</h6>
        </div>
        <div className="member-info">
          <h6>Name: {member.userName}</h6>
          <h6>
            {member.memberShip
              ? `Package: ${member.memberShip}`
              : "No package selected"}
          </h6>
          <h6>
            Status:{" "}
            <span
              style={{ color: member.status === "active" ? "green" : "red" }}
            >
              {member.status}
            </span>
          </h6>
          <h6>
            {member.memberShip === "Semi-monthly"
              ? `Remaining days: ${12 - member.session.length}`
              : `Expiry Date: ${member.expiryDate}`}
          </h6>
          <h6>
            Phone Number: {member.phoneNumber}
          </h6>
        </div>

        <div className="manage-member">
          {/* Mark Attendance Button */}
          <div className="attendance-button">
            {/* {message && <p className="message">{message}</p>} */}

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
              disabled={member.status == "active"}
              className={`${
                member.status == "active" ? "change-package-disabled" : ""
              } `}
            >
              Renew Subscription
            </button>
          </div>

          {/* Change Plan Placeholder */}
          <div className="renew">
            <div className="change-package">
              <button
                onClick={toggleExtraFields}
                disabled={member.status == "active"}
                className={`${
                  member.status == "active" ? "change-package-disabled" : ""
                } `}
              >
                Select a new package
              </button>
            </div>
          </div>
          {/* Delete Member Button */}
          <div className="delete-member">
            <button
              onClick={deleteMember}
              style={{ backgroundColor: "red", color: "white" }}
            >
              Delete Member
            </button>
          </div>
        </div>
        {showExtraFields && (
          <div>
            <form action="">
              <select
                value={selectedPackage}
                onChange={handlePackageChange}
                style={{ padding: "10px", marginTop: "10px" }}
                disabled={member.status == "active"}
              >
                <option value="" disabled>
                  Select a new package
                </option>
                {packages.map((pkg) => (
                  <option key={pkg.id} value={pkg.packageName}>
                    {pkg.packageName} - {pkg.numberOfDays} days
                  </option>
                ))}
              </select>
              <button
                type="submit"
                style={{ padding: "10px", marginTop: "10px" }}
                onClick={handleSubmitting}
                disabled={member.status == "active"}
                className={`${
                  member.status == "active" ? "change-package-disabled" : ""
                } `}
              >
                {" "}
                Submit{" "}
              </button>
            </form>
            <p>Selected Package: {selectedPackage}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default MemberPage;
