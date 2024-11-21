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
        setMessage('Error fetching members. Please try again.');
      }
    };

    fetchMembers();
  }, []);

  const resetAttendance = async (id) => {
    try {
      const response = await fetch('http://localhost:5000/member/resetAttendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || 'Error resetting attendance.');
        return;
      }

      setMessage(`Attendance reset for ${data.member.userName}`);
      
      // Update the state
      setMembers((prevMembers) =>
        prevMembers.map((member) =>
          member.id === id
            ? { ...member, session: [], status: 'active' }
            : member
        )
      );
    } catch (error) {
      console.error('Error resetting attendance:', error);
      setMessage('Something went wrong. Please try again later.');
    }
  };

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


      setMessage(`Attendance marked for ${data.member.userName} on ${new Date().toLocaleDateString()}`);
      // Update the state with the new attendance array
      setMembers((prevMembers) =>
        prevMembers.map((member) =>
          member.id === id
            ? { ...member, session: [...member.session, new Date().toISOString()] }
            : member
        )
      );
    } catch (error) {
      console.error('Error marking attendance:', error);
      setMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <div>
      <h3 style={{ marginTop: '250px' }}>Attendance Page</h3>
      {message && <p>{message}</p>}
      {Array.isArray(members) &&
        members.map((member) => (
          <div key={member.id}>
            <p>
              {member.userName} - Attendance: {member.session?.length || 0} - Status: {member.status}
            </p>
            <button onClick={() => markAttendance(member.id)}>Mark Attendance</button>
            <button onClick={() => resetAttendance(member.id)} style={{ marginLeft: '10px' }}>
              Reset
            </button>
          </div>
        ))}
    </div>
  );
};

export default AttendancePage;
