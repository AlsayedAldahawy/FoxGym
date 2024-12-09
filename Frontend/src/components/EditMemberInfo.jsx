import { useState, useEffect } from "react";
import "../assets/css/editMemberInfo.css"; // Add your modal styles
import { useAuth } from "../context/AuthContext";
import { extraFieldsIcon } from "./Icons";
import useFetchData from "./fetchData";
import { claculateRemaining } from "../assets/js/calculatePayments";
import PropTypes from "prop-types";
import { calculateDate } from "../assets/js/auxFunctions";

const EditMemberInfo = ({ member, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState(""); // To store success or error message
  const { username } = useAuth();

  const toggleExtraFields = () => {
    setShowExtraFields(!showExtraFields);
  };
  const [showExtraFields, setShowExtraFields] = useState(false);

  const { payment, packages, loading, error } = useFetchData();

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
      discount: member.discount || 0,
      remaining: member.remaining || 0,
    });
  }, [member, loading, error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      const updatedData = { ...prevState, [name]: value };

      const selectedPackage = packages.find(
        (pkg) => pkg.packageName === updatedData.memberShip
      );
      const selectedPayment = payment.find(
        (paym) => paym.paymentName === updatedData.program
      );

      updatedData.expiryDate = calculateDate(
        updatedData.startDate,
        selectedPackage
      );
      updatedData.remaining = claculateRemaining(
        selectedPackage,
        selectedPayment,
        updatedData.discount,
        updatedData.paid
      );

      return updatedData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const success = await onUpdate(member.id, formData);
      if (success) {
        setMessage("Member information updated successfully!");
        setTimeout(() => {
          onClose();
        }, 1000);
      } else {
        setMessage("Failed to update member information.");
      }
    } catch (error) {
      console.error("Error updating member info:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
                      className="form-control"
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
                      name="program"
                      value={formData.program}
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        Select Program
                      </option>
                      {payment.map((paym) => (
                        <option key={paym.id} value={paym.paymentName}>
                          {paym.paymentName}
                        </option>
                      ))}
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
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

EditMemberInfo.propTypes = {
  member: PropTypes.shape({
    id: PropTypes.string.isRequired,
    paid: PropTypes.number,
    memberShip: PropTypes.string,
    startDate: PropTypes.string,
    expiryDate: PropTypes.string,
    program: PropTypes.string,
    discount: PropTypes.number,
    remaining: PropTypes.number,
    userName: PropTypes.string,
    birthDate: PropTypes.string,
    phoneNumber: PropTypes.string,
    email: PropTypes.string,
    gender: PropTypes.string,
    joinDate: PropTypes.string,
    attentanceMatrix: PropTypes.array,
    session: PropTypes.array,
    status: PropTypes.string,
    height: PropTypes.number,
    weight: PropTypes.number,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EditMemberInfo;
