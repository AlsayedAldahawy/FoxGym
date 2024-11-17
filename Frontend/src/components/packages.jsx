// frontend/src/components/PackageSelector.js
import React, { useState, useEffect } from 'react';

const PackageSelector = ({ value, onChange }) => {
  const [packages, setPackages] = useState([]);

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

  return (
    <div className="form-group">
      <label>Membership Package</label>
      <select
        name="memberShip"
        className="form-control"
        value={value}
        onChange={onChange}
      >
        <option value="">Select Package</option>
        {packages.map((pkg) => (
          <option key={pkg.id} value={pkg.packageName}>
            {pkg.packageName} - {pkg.numberOfDays} days
          </option>
        ))}
      </select>
    </div>
  );
};

export default PackageSelector;
