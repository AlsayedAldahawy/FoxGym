import React, { useState, useRef } from 'react';
import '../assets/css/addMember.css'; // Assuming your styles are in the same folder
import { useNavigate } from 'react-router-dom';

const AddNewMember = () => {
  const userNameRef = useRef(null);
  const emailRef = useRef(null);
  const birthDateRef = useRef(null);
  const memberShipRef = useRef(null);
  const startDateRef = useRef(null);
  const expiryDateRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const paymentStatusRef = useRef(null);
  const heightRef = useRef(null);
  const weightRef = useRef(null);
  const genderRef = useRef(null);
  const imageRef = useRef(null);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    const userName = userNameRef.current.value;
    const email = emailRef.current.value;
    const birthDate = birthDateRef.current.value;
    const memberShip = memberShipRef.current.value;
    const startDate = startDateRef.current.value;
    const expiryDate = expiryDateRef.current.value;
    const phoneNumber = phoneNumberRef.current.value;
    const paymentStatus = paymentStatusRef.current.value;
    const height = parseFloat(heightRef.current.value);
    const weight = parseFloat(weightRef.current.value);
    const gender = genderRef.current.value;
    const image = imageRef.current.value;

    // Clear previous success and error messages
    setError('');
    setSuccess('');

    // Validate form data
    if (!userName || !email || !birthDate || !memberShip || !startDate || !expiryDate || !phoneNumber || !paymentStatus || !height || !weight || !gender) {
      setError("All fields are required.");
      return;
    }

    // Call the API to add the new member
    try {
      const response = await fetch("http://localhost:5000/members/addMember", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
          email,
          birthDate,
          memberShip,
          startDate,
          expiryDate,
          phoneNumber,
          paymentStatus,
          height,
          weight,
          gender,
          image,
        }),
      });

      if (!response.ok) {
        setError("Unable to add member. Please try again.");
        return;
      }

      const data = await response.json();

      if (data && data.success) {
        setSuccess("New member added successfully!");
        // Optionally, navigate to members list or clear the form
        setTimeout(() => {
          navigate("/members");
        }, 3000);
      } else {
        setError("Something went wrong. Please try again.");
      }

    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className='login template d-flex justify-content-center align-items-center vh-100 bg-image'>
      <div className='form-container p-5 rounded bg-white'>
        <form onSubmit={onSubmit}>
          <h3 className='text-center'>Add New Member</h3>
          <div className='form-row'>
            <div className='form-group'>
              <label htmlFor='userName'>User Name</label>
              <input type='text' placeholder='Enter User Name' className='form-control' ref={userNameRef} />
            </div>
            <div className='form-group'>
              <label htmlFor='email'>Email</label>
              <input type='email' placeholder='Enter Email' className='form-control' ref={emailRef} />
            </div>
          </div>
          <div className='form-row'>
            <div className='form-group'>
              <label htmlFor='birthDate'>Birth Date</label>
              <input type='date' className='form-control' ref={birthDateRef} />
            </div>
            <div className='form-group'>
              <label htmlFor='memberShip'>Membership</label>
              <input type='text' placeholder='Enter Membership' className='form-control' ref={memberShipRef} />
            </div>
          </div>
          <div className='form-row'>
            <div className='form-group'>
              <label htmlFor='startDate'>Start Date</label>
              <input type='date' className='form-control' ref={startDateRef} />
            </div>
            <div className='form-group'>
              <label htmlFor='expiryDate'>Expiry Date</label>
              <input type='date' className='form-control' ref={expiryDateRef} />
            </div>
          </div>
          <div className='form-row'>
            <div className='form-group'>
              <label htmlFor='phoneNumber'>Phone Number</label>
              <input type='text' placeholder='Enter Phone Number' className='form-control' ref={phoneNumberRef} />
            </div>
            <div className='form-group'>
              <label htmlFor='paymentStatus'>Payment Status</label>
              <input type='text' placeholder='Enter Payment Status' className='form-control' ref={paymentStatusRef} />
            </div>
          </div>
          <div className='form-row'>
            <div className='form-group'>
              <label htmlFor='height'>Height</label>
              <input type='number' placeholder='Enter Height (in cm)' className='form-control' ref={heightRef} />
            </div>
            <div className='form-group'>
              <label htmlFor='weight'>Weight</label>
              <input type='number' placeholder='Enter Weight (in kg)' className='form-control' ref={weightRef} />
            </div>
          </div>
          <div className='form-row'>
            <div className='form-group'>
              <label htmlFor='gender'>Gender</label>
              <select className='form-control' ref={genderRef}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className='form-group'>
              <label htmlFor='image'>Image URL</label>
              <input type='text' placeholder='Enter Image URL' className='form-control' ref={imageRef} />
            </div>
          </div>
          <div className='d-grid'>
            <button type='submit' className='btn-signin'>Add Member</button>
          </div>
          {error && <p className="text-danger">{error}</p>}
          {success && <p className="text-success">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddNewMember;

