import React, { useState, useEffect } from "react";
import "../assets/css/editMemberInfo.css"; // Add your modal styles

const EditMemberInfo = ({ member, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState(""); // To store success or error message

  // Populate fields with the member's original data
  useEffect(() => {
    setFormData({
      gender: member.gender || "",
      email: member.email || "",
      phoneNumber: member.phoneNumber || "",
      birthDate: member.birthDate || "",
      height: member.height || "",
      weight: member.weight || "",
    });
  }, [member]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear any previous messages

    try {
      const success = await onUpdate(member.id, formData);
      if (success) {
        setMessage("Member information updated successfully!");
        setTimeout(() => {
          onClose();
        }, 12000); // Close the modal after 1.5 seconds
      } else {
        setMessage("Failed to update member information.");
      }
    } catch (error) {
      console.error("Error updating member info:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3 className="header">Edit Member Information</h3>
        {message && (
          <p className={message.includes("successfully") ? "success-message" : "error-message"}>
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <label>
            Gender:
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Phone Number:
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Birth Date:
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Height (cm):
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Weight (kg):
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              required
            />
          </label>
          <div className="modal-actions">
            <button type="submit" className="update-button">Save</button>
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMemberInfo;
