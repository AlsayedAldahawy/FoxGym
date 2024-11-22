import React, { useState, useEffect } from "react";

const AttendancePage = () => {
  const [members, setMembers] = useState([]);
  const [message, setMessage] = useState("");
  const [markedMembers, setMarkedMembers] = useState({}); // Tracks marked attendance states

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch("http://localhost:5000/member/getAllMembers");
        const data = await response.json();
        setMembers(Array.isArray(data.members) ? data.members : []);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);

  const toggleAttendance = async (id) => {
    try {
      const isMarked = markedMembers[id];
      const url = isMarked
        ? "http://localhost:5000/member/unattend" // API endpoint to remove attendance
        : "http://localhost:5000/member/attendance"; // API endpoint to add attendance

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Error updating attendance.");
        return;
      }

      // Update button state
      setMarkedMembers((prev) => ({
        ...prev,
        [id]: !isMarked,
      }));

      // Reset the button after 2 minutes
      setTimeout(() => {
        setMarkedMembers((prev) => ({ ...prev, [id]: false }));
      }, 6000);

      // Update attendance in the UI
      setMembers((prevMembers) =>
        prevMembers.map((member) =>
          member.id === id
            ? {
                ...member,
                session: isMarked
                  ? member.session.slice(0, -1) // Remove the last attendance date
                  : [...member.session, new Date().toISOString()], // Add a new attendance date
              }
            : member
        )
      );

      setMessage(isMarked ? "Attendance removed successfully." : "Attendance marked successfully.");
    } catch (error) {
      console.error("Error updating attendance:", error);
      setMessage("Something went wrong.");
    }
  };

  const resetAttendance = async (id) => {
    try {
      const response = await fetch("http://localhost:5000/member/resetAttendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Error resetting attendance.");
        return;
      }

      setMessage("Attendance reset successfully.");

      // Reset the specific member's session and status in the UI
      setMembers((prevMembers) =>
        prevMembers.map((member) =>
          member.id === id
            ? {
                ...member,
                session: [],
                status: "active",
              }
            : member
        )
      );
    } catch (error) {
      console.error("Error resetting attendance:", error);
      setMessage("Something went wrong.");
    }
  };

  return (
    <div>
      <h3 style={{ marginTop: "250px" }}>Attendance Page</h3>
      {message && <p>{message}</p>}
      {Array.isArray(members) &&
        members.map((member) => (
          <div key={member.id} style={{ marginBottom: "20px" }}>
            <p>
              {member.userName} - Attendance: {member.session.length}
            </p>
            <button
              onClick={() => toggleAttendance(member.id)}
              style={{
                backgroundColor: markedMembers[member.id] ? "red" : "green",
                color: "white",
                padding: "8px 16px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                marginRight: "10px",
              }}
            >
              {markedMembers[member.id] ? "Unattend" : "Mark as Attend"}
            </button>
            <button
              onClick={() => resetAttendance(member.id)}
              style={{
                backgroundColor: "#ed563b",
                color: "white",
                padding: "8px 16px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Reset Attendance
            </button>
          </div>
        ))}
    </div>
  );
};

export default AttendancePage;
