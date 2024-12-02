import React, { useState, useEffect } from "react";
import "../assets/css/updatePassModal.css";

const UpdateCoachInfo = React.memo(({ coach = {}, onClose, onUpdate }) => {
  const initialFormState = {
    gender: "",
    email: "",
    speciality: "",
    phoneNumber: "",
    birthDate: "",
    height: "",
    weight: "",
    yearsOfExperience: "",
    bio: "",
    startDate: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setFormData({
      gender: coach.gender || "",
      email: coach.email || "",
      speciality: coach.speciality || "",
      phoneNumber: coach.phoneNumber || "",
      birthDate: coach.birthDate || "",
      height: coach.height || "",
      weight: coach.weight || "",
      yearsOfExperience: coach.yearsOfExperience || "",
      bio: coach.bio || "",
      startDate: coach.startDate || "",
    });
  }, [coach]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const success = await onUpdate(coach.userName, formData);
      if (success) {
        setMessage("Coach's information updated successfully!");
        setTimeout(() => {
          onClose();
        }, 1500); // Close the modal after 1.5 seconds
      } else {
        setMessage("Failed to update coach information.");
      }
    } catch (error) {
      console.error("Error updating coach info:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3 className="header">Edit Member Information</h3>
        {message && (
          <p
            className={
              message.includes("successfully")
                ? "success-message"
                : "error-message"
            }
          >
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="field-row">
            <label className="cell">
              Gender:
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>
            <label className="cell">
              Speciality:
              <input
                name="speciality"
                value={formData.speciality}
                onChange={handleChange}
              />
            </label>
          </div>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <div className="field-row">
            <label className="cell">
              Phone Number:
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </label>
            <label className="cell">
              Birth Date:
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="field-row">
            <label className="cell">
              Height (cm):
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
              />
            </label>
            <label className="cell">
              Weight (kg):
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="field-row">
            <label className="cell">
              Years of experience:
              <input
                type="number"
                name="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleChange}
              />
            </label>
            <label className="cell">
              Bio:
              <input
                type="text"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="modal-actions">
            <button type="submit" className="update-button">
              Save
            </button>
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

UpdateCoachInfo.displayName = "UpdateCoachInfo";

export default UpdateCoachInfo;
