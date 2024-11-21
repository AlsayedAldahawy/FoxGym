import React, { useState, useEffect } from 'react';

const AttendancePage = () => {
  const [members, setMembers] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch('http://localhost:5000/member/getAllMembers');
        const data = await response.json();
        console.log('Fetched Members:', data); // Debugging
        setMembers(Array.isArray(data.members) ? data.members : []); // Ensure it's an array of members
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    fetchMembers();
  }, []);

  const markAttendance = async (id) => {
    try {
      const response = await fetch('http://localhost:5000/member/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }), // Ensure you're sending the correct member ID
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || 'Error marking attendance.');
        return; 
      }
      if (response.status === 403) {
        const data = await response.json();
        setMessage(data.message); // Set the error message for the user
        return;
      }


      setMessage(`Attendance marked for member ID: ${id}`);
      // Optionally, update the state with the new attendance count if returned
      setMembers((prevMembers) =>
        prevMembers.map((member) =>
          member.id === id ? { ...member, attendance: member.attendance + 1 } : member
        )
      );
    } catch (error) {
      console.error('Error marking attendance:', error);
      setMessage('Something went wrong.');
    }
  };

  return (
    <div>
      <h3 style={{ marginTop: '250px' }}>Attendance Page</h3>
      {message && <p>{message}</p>}
      {Array.isArray(members) &&
        members.map((member) => (
          <div key={member.id}>
            <p>{member.userName} - Attendance: {member.attendance}</p>
            <button onClick={() => markAttendance(member.id)}>Mark Attendance</button>
          </div>
        ))}
    </div>
  );
};

export default AttendancePage;
