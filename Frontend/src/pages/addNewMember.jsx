import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MemberFormInputs from '../components/MemberFormInputs.jsx'; // Import the new MemberFormInputs component
import '../assets/css/addMember.css';

const AddNewMember = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    birthDate: '',
    memberShip: '',
    startDate: new Date().toISOString().split('T')[0],
    expiryDate: '',
    phoneNumber: '',
    paymentStatus: '',
    height: '',
    weight: '',
    gender: '',
    image: '',
  });

  const [packages, setPackages] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch('http://localhost:5000/packages');
        const data = await response.json();
        setPackages(data);
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };
    fetchPackages();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };
      if (name === 'memberShip') {
        const selectedPackage = packages.find((pkg) => pkg.packageName === value);
        if (selectedPackage) {
          const startDate = new Date(updatedData.startDate);
          const expiryDate = new Date(startDate);
          expiryDate.setDate(startDate.getDate() + selectedPackage.numberOfDays);
          updatedData.expiryDate = expiryDate.toISOString().split('T')[0];
        }
      }
      return updatedData;
    });
  };

  const validateForm = () => {
    const { userName, email, birthDate, memberShip, startDate, expiryDate, phoneNumber, paymentStatus, height, weight, gender } = formData;
    if (!userName || !memberShip || !paymentStatus || !gender) return 'All fields are required.';
    if (!/^\S+@\S+\.\S+$/.test(email)) return 'Invalid email address.';
    if (isNaN(Number(height)) || isNaN(Number(weight))) return 'Height and Weight must be numeric values.';
    return '';
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/member/addMember', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          height: parseFloat(formData.height),
          weight: parseFloat(formData.weight),
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || 'Unable to add member. Please try again.');
        return;
      }
      setSuccess('New member added successfully!');
      setTimeout(() => navigate('/members'), 3000);
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
          <MemberFormInputs formData={formData} handleChange={handleChange} packages={packages} />
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
