import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/css/memberPage.css";
import EditMemberInfo from "../components/EditMemberInfo"; // Import the EditMemberInfo component

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
  const [showEditModal, setShowEditModal] = useState(false); // State to control modal visibility

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

  function calculateAge(birthDateString) {
    // Split the birth date string into day, month, and year
    const [day, month, year] = birthDateString.split("-"); // Create a new Date object using the parsed values
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
      <div className="member-page">
        <div className="main-row">
          <div className="main-column">
            <div className="edit-member">
              <svg
                name="modify"
                onClick={() => setShowEditModal(true)}
                xmlns="http://www.w3.org/2000/svg"
                xmlns:serif="http://www.serif.com/"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                fill="#ff4800"
                width="25px"
                height="25px"
                viewBox="0 0 32 32"
                version="1.1"
                xml:space="preserve"
              >
                <path d="M12.965,5.462c0,-0 -2.584,0.004 -4.979,0.008c-3.034,0.006 -5.49,2.467 -5.49,5.5l0,13.03c0,1.459 0.579,2.858 1.611,3.889c1.031,1.032 2.43,1.611 3.889,1.611l13.003,0c3.038,-0 5.5,-2.462 5.5,-5.5c0,-2.405 0,-5.004 0,-5.004c0,-0.828 -0.672,-1.5 -1.5,-1.5c-0.827,-0 -1.5,0.672 -1.5,1.5l0,5.004c0,1.381 -1.119,2.5 -2.5,2.5l-13.003,0c-0.663,-0 -1.299,-0.263 -1.768,-0.732c-0.469,-0.469 -0.732,-1.105 -0.732,-1.768l0,-13.03c0,-1.379 1.117,-2.497 2.496,-2.5c2.394,-0.004 4.979,-0.008 4.979,-0.008c0.828,-0.002 1.498,-0.675 1.497,-1.503c-0.001,-0.828 -0.675,-1.499 -1.503,-1.497Z" />
                <path d="M20.046,6.411l-6.845,6.846c-0.137,0.137 -0.232,0.311 -0.271,0.501l-1.081,5.152c-0.069,0.329 0.032,0.671 0.268,0.909c0.237,0.239 0.577,0.343 0.907,0.277l5.194,-1.038c0.193,-0.039 0.371,-0.134 0.511,-0.274l6.845,-6.845l-5.528,-5.528Zm1.415,-1.414l5.527,5.528l1.112,-1.111c1.526,-1.527 1.526,-4.001 -0,-5.527c-0.001,-0 -0.001,-0.001 -0.001,-0.001c-1.527,-1.526 -4.001,-1.526 -5.527,-0l-1.111,1.111Z" />
                <g id="Icon" />
              </svg>
            </div>
            <div className="member-pic">
              <img
                src={`${member.gender === "Male" ? defMale : defFemale}`}
                alt=""
              />
              <h6 className="member-id">{member.id}</h6>
            </div>

            <div className="info-column">
              <h6>{member.userName || "No data"}</h6>
              <h6>{calculateAge(member.birthDate) || "No data"}</h6>
              {console.log(new Date(member.birthDate))}
              <h6>{member.gender || "No data"}</h6>
              <h6>
                {" "}
                <span
                  style={{
                    color: member.status === "active" ? "green" : "red",
                  }}
                >
                  {member.status || "No data"}
                </span>
              </h6>
              <h6>
                {member.memberShip
                  ? `${member.memberShip}`
                  : "No package selected"}
              </h6>
              <h6>
                Program:{" "}
                <span
                  style={{
                    color: member.program === "Paid" ? "green" : "red",
                  }}
                >
                  {member.program || "No data"}
                </span>
              </h6>
            </div>
          </div>
          <div className="secondary-column">
            <div className="grid-element">
              <h6>Phone Number: {member.phoneNumber || "No data"}</h6>
              <h6>Email: {member.email || "No data"}</h6>
            </div>

            <div className="grid-element">
              <h6>Start Date: {member.startDate || "No data"}</h6>
              <h6>
                {member.memberShip === "Semi-monthly"
                  ? `Remaining days: ${12 - member.session.length}`
                  : `Expiry Date: ${member.expiryDate}`}
              </h6>
            </div>
            <div className="grid-element">
              <h6>Birth Date: {member.birthDate || "No data"}</h6>
              <h6>
                Height: {member.height ? `${member.height} cm` : "No data"}
              </h6>
              <h6>
                Weight: {member.weight ? `${member.weight} kg` : "No data"}
              </h6>
              <h6>
                BMI:{" "}
                {member.weight && member.height
                  ? `${(member.weight / ((member.height * member.height) / 10000)).toFixed(2)}`
                  : "No data"}
              </h6>
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
            {marked ? "Unattend" : "Mark Attendance"}
          </button>

          {/* Reset Attendance Button */}
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

          {/* Change Plan Placeholder */}
          <button
            onClick={toggleExtraFields}
            disabled={member.status == "active"}
            className={`${
              member.status == "active" ? "change-package-disabled" : ""
            } `}
          >
            Select a new package
          </button>
          {/* Delete Member Button */}
          <button
            onClick={deleteMember}
            style={{ backgroundColor: "red", color: "white" }}
          >
            Delete Member
          </button>
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
                    {pkg.packageName}
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
      {/* Show modal when the button is clicked */}
      {showEditModal && (
        <EditMemberInfo
          member={member}
          onClose={() => setShowEditModal(false)}
          onUpdate={handleEditMember}
        />
      )}
    </>
  );
}

export default MemberPage;
