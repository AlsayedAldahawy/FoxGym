// frontend/src/components/AddNewMember.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PackageSelector from './packages'; // Import the new PackageSelector component
import '../assets/css/addMember.css';

const AddNewMember = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    birthDate: '',
    memberShip: '',
    startDate: '',
    expiryDate: '',
    phoneNumber: '',
    paymentStatus: '',
    height: '',
    weight: '',
    gender: '',
    image: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate form data
  const validateForm = () => {
    const {
      userName, email, birthDate, memberShip, startDate, expiryDate,
      phoneNumber, paymentStatus, height, weight, gender,
    } = formData;

    if (!userName || !memberShip || !paymentStatus || !gender) {
      return 'All fields are required.';
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return 'Invalid email address.';
    }

    if (isNaN(Number(height)) || isNaN(Number(weight))) {
      return 'Height and Weight must be numeric values.';
    }

    return '';
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Clear previous messages
    setError('');
    setSuccess('');

    // Validate form data
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    // Call the API to add the new member
    try {
      const response = await fetch('http://localhost:5000/member/addMember', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          height: parseFloat(formData.height),
          weight: parseFloat(formData.weight),
        }),
      });

      const data = await response.json();
      console.log('API Response:', data);

      if (!response.ok) {
        setError(data.message || 'Unable to add member. Please try again.');
        return;
      }

      setSuccess('New member added successfully!');
      setTimeout(() => {
        navigate('/members');
      }, 3000);
    } catch (error) {
      console.error('API Error:', error);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="login template d-flex justify-content-center align-items-center vh-100 bg-image">
      <div className="form-container p-5 rounded bg-white">
        <form onSubmit={onSubmit}>
          <h3 className="text-center">Add New Member</h3>
          <div className='form-row'>
            <div className="form-group">
              <label>User Name</label>
              <input
                type="text"
                name="userName"
                placeholder="Enter User Name"
                className="form-control"
                value={formData.userName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='form-row'>
            <div className="form-group">
              <label>Birth Date</label>
              <input
                type="date"
                name="birthDate"
                className="form-control"
                value={formData.birthDate}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <PackageSelector
                value={formData.memberShip}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='form-row'>
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                className="form-control"
                value={formData.startDate}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Expiry Date</label>
              <input
                type="date"
                name="expiryDate"
                className="form-control"
                value={formData.expiryDate}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='form-row'>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Enter Phone Number"
                className="form-control"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Payment Status</label>
              <input
                type="text"
                name="paymentStatus"
                placeholder="Enter Payment Status"
                className="form-control"
                value={formData.paymentStatus}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='form-row'>
            <div className="form-group">
              <label>Height</label>
              <input
                type="number"
                name="height"
                placeholder="Enter Height (in cm)"
                className="form-control"
                value={formData.height}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Weight</label>
              <input
                type="number"
                name="weight"
                placeholder="Enter Weight (in kg)"
                className="form-control"
                value={formData.weight}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='form-row'>
            <div className="form-group">
              <label>Gender</label>
              <select
                name="gender"
                className="form-control"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Image URL</label>
              <input
                type="text"
                name="image"
                placeholder="Enter Image URL"
                className="form-control"
                value={formData.image}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn-signin">Add Member</button>
          </div>
          {error && <p className="text-danger">{error}</p>}
          {success && <p className="text-success">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddNewMember;
