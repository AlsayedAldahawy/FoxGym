import React from 'react';

const MemberFormInputs = ({ formData, handleChange, packages }) => {
  return (
    <>
      <div className="form-row">
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
            type="text"
            name="email"
            placeholder="Enter Email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="form-row">
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
          <label>Membership Package</label>
          <select
            name="memberShip"
            className="form-control"
            value={formData.memberShip}
            onChange={handleChange}
          >
            <option value="">Select Package</option>
            {packages.map((pkg) => (
              <option key={pkg.id} value={pkg.packageName}>
                {pkg.packageName} - {pkg.numberOfDays} days
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-row">
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
            readOnly
          />
        </div>
      </div>
      <div className="form-row">
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
      <div className="form-row">
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
      <div className="form-row">
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
    </>
  );
};

export default MemberFormInputs;
