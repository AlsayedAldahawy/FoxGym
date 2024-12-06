import React, { useState, useEffect } from "react";
import "../assets/css/editMemberInfo.css"; // Add your modal styles
import { useAuth } from "../context/AuthContext";
import { extraFieldsIcon } from "./Icons";
import useFetchData from "./fetchData";

const EditMemberInfo = ({ member, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState(""); // To store success or error message
  const { username } = useAuth();

  const toggleExtraFields = () => {
    setShowExtraFields(!showExtraFields);
  };
  const [showExtraFields, setShowExtraFields] = useState(false);

  const { payment, packages, loading, error } = useFetchData();
  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  // if (error) {
  //   return <div>Error: {error}</div>;
  // } // Populate fields with the member's original data
  useEffect(() => {
    setFormData({
      userName: member.userName || "",
      gender: member.gender || "",
      email: member.email || "",
      paid: member.paid || 0,
      phoneNumber: member.phoneNumber || "",
      birthDate: member.birthDate || "",
      height: member.height || "",
      weight: member.weight || "",
      joinDate: member.joinDate || "",
      memberShip: member.memberShip || "",
      startDate: member.startDate || "",
      expiryDate: member.expiryDate || "",
      program: member.program || "",
      status: member.status || "",
      session: member.session || "",
      attendanceMatrix: member.attentanceMatrix || "",
      discount: member.discount || "",
      remaining: member.remaining || 0,
    });
  }, [member]);
  // console.log("username", useAuth().username)

  const claculateRemaining = (pkg, payment, discount, paid) => {
    if (!pkg || !payment) {
      return;
    }

    if (!discount) {
      discount = 0;
    }

    const packageMonths = Math.floor(pkg.numberOfDays / 30);

    const durationConstatnt =
      payment.paymentName === "Semi-monthly" ? 0.8 : packageMonths;

    const treadmillOverPrice =
      payment.paymentName === "Semi-monthly" &&
      pkg.packageName.includes("Treadmill")
        ? 10 * packageMonths
        : 0;

    return (
      durationConstatnt * payment.price * (1 - discount / 100) +
      treadmillOverPrice -
      paid
    );
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      const updatedFormData = { ...prevState, [name]: value };

      const selectedPackage = packages.find(
        (pkg) => pkg.packageName === updatedFormData.memberShip
      );
      const selectedPayment = payment.find(
        (paym) => paym.paymentName === updatedFormData.program
      );

      updatedFormData.remaining = claculateRemaining(
        selectedPackage,
        selectedPayment,
        updatedFormData.discount,
        updatedFormData.paid
      );

      return updatedFormData;
    });
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
        <h3 className="header-edit-text">Edit Member Information</h3>
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
          <div className="form-row">
            <div className="form-column">
              <div className="field-row">
                {" "}
                <label className="cell">
                  Name:
                  {username === "Amir Elsayed" ||
                  username === "Mahmoud Farag" ? (
                    <input
                      type="username"
                      name="userName"
                      value={formData.userName}
                      onChange={handleChange}
                    />
                  ) : (
                    <input disabled={true} value={formData.userName} />
                  )}
                </label>
                <label className="cell">
                  Phone Number:
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
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
                  Gender:
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select Gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
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
                  Paid:
                  <input
                    name="paid"
                    value={formData.paid}
                    onChange={handleChange}
                  />
                </label>
                <label className="cell">
                    Remaining:
                    <input
                      disabled
                      type="number"
                      name="remaining"
                      value={formData.remaining}
                      onChange={handleChange}
                    />
                  </label>
              </div>
            </div>
            {showExtraFields && (
              <div className="form-column">
                <div className="field-row">
                  <label className="cell">
                    Renewal Date:
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                    />
                  </label>
                  <label className="cell">
                    Expiry Date:
                    <input
                      type="date"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                    />
                  </label>
                </div>

                <div className="field-row">
                  
                  <label className="cell">
                    Program:
                    <select
                      type="program"
                      name="program"
                      value={formData.program}
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        Select Program
                      </option>
                      <option value="Lifting">Lifting</option>
                      <option value="Lifting + Treadmill">
                        Lifting + Treadmill
                      </option>
                      <option value="Cross Fit">Cross Fit</option>
                      <option value="Mixed">Mixed</option>
                    </select>
                  </label>
                  <label className="cell">
                    Duration:
                    <select
                      name="memberShip"
                      value={formData.memberShip}
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        Select Package
                      </option>
                      {packages.map((pkg) => (
                        <option key={pkg.id} value={pkg.packageName}>
                          {pkg.packageName}
                        </option>
                      ))}
                    </select>
                  </label>
                  
                </div>

                <div className="field-row">
                <label className="cell">
                    Status:
                    <select
                      type="status"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        Select Status
                      </option>
                      <option value="active">active</option>
                      <option value="inactive">inactive</option>
                    </select>
                  </label>
                  <label className="cell">
                    Discount (%):
                    <input
                      type="number"
                      name="discount"
                      value={formData.discount}
                      onChange={handleChange}
                    />
                  </label>
                </div>
              </div>
            )}
          </div>
          {(username === "Amir Elsayed" || username === "Mahmoud Farag") && (
            <div className="extra-fields-button">
              <div onClick={toggleExtraFields}>
                <div
                  style={{ transform: "rotate(-90deg)" }}
                  className={`${showExtraFields ? "click-animation" : ""}`}
                  title={`${
                    !showExtraFields ? "More information" : "Less information"
                  }`}
                >
                  {extraFieldsIcon}
                </div>
              </div>
            </div>
          )}
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
};

export default EditMemberInfo;
