import React, { useState, useEffect } from "react";
import "../assets/css/editMemberInfo.css"; // Add your modal styles

const RenewSubscriptionModal = ({ member, onClose, onRenew }) => {
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState("");
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState("");


  // change package
  const [showExtraFields, setShowExtraFields] = useState(false);

  const toggleExtraFields = () => {
    setShowExtraFields(!showExtraFields);
  };


  // Populate fields with the member's original data
  useEffect(() => {
    setFormData({
      memberShip: member.memberShip || "",
      startDate: member.startDate || "",
      expiryDate: member.expiryDate || "",
      program: member.program || "",
      discount: member.discount || 0,
      paied: member.paied || 0,
      remaining: member.remaining || 0,
    });
  }, [member]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/packages");
        setPackages(response.data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };
    fetchPackages();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const success = await onRenew(member.id, formData);
      if (success) {
        setMessage("Subscription renewed successfully!");
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setMessage("Failed to renew subscription.");
      }
    } catch (error) {
      console.error("Error renewing subscription:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3 className="header">Renew Subscription</h3>
        {message && (
          <p className={message.includes("successfully") ? "success-message" : "error-message"}>
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <label>
            Membership:
            <input
              type="text"
              name="memberShip"
              value={formData.memberShip}
              onChange={handleChange}
            />
          </label>
          <label>
            Start Date:
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
            />
          </label>
          <label>
            Expiry Date:
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
            />
          </label>
          <label>
            Program:
            <input
              type="text"
              name="program"
              value={formData.program}
              onChange={handleChange}
            />
          </label>
          <label>
            Discount:
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
            />
          </label>
          <label>
            Paid:
            <input
              type="number"
              name="paied"
              value={formData.paied}
              onChange={handleChange}
            />
          </label>
          <label>
            Remaining:
            <input
              type="number"
              name="remaining"
              value={formData.remaining}
              onChange={handleChange}
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

export default RenewSubscriptionModal;
