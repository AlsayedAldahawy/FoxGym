import React, { useState } from "react";
import "../assets/css/updatePassModal.css"; // Add your modal styles

export default function UpdatePasswordModal({ onClose, onUpdatePassword }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");
  const [message, setMessage] = useState(""); // To store success or error message

  const handleUpdate = async () => {
    setMessage(""); // Clear previous messages
    if (!oldPassword || !newPassword) {
      setMessage("Both fields are required.");
      return;
    }

    if (newPassword !== reNewPassword) {
      setMessage("New password mismatch");
      return
    }
    try {
      const success = await onUpdatePassword(oldPassword, newPassword);
      if (success) {
        setMessage("Password updated successfully!"); // Show success message
        // Delay closing modal to let the user see the success message
        setTimeout(() => {
          onClose();
        }, 1500); // 1.5 seconds delay
      } else {
        setMessage("Failed to update password. Please check old password");
      }
    } catch (error) {
      setMessage("An error occurred while updating password.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3 className="header">Update Password</h3>
        {message && (
          <p
            className={message.includes("successfully") ? "success-message" : "error-message"}
          >
            {message}
          </p>
        )}
        <input className="input"
          type="password"
          placeholder="Enter old password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <input className="input"
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input className="input"
          type="password"
          placeholder="Re-Enter the new password"
          value={reNewPassword}
          onChange={(e) => setReNewPassword(e.target.value)}
        />
        <div className="modal-actions">
          <button onClick={handleUpdate} className="update-button">Update</button>
          <button onClick={onClose} className="cancel-button">Cancel</button>
        </div>
      </div>
    </div>
  );
}
