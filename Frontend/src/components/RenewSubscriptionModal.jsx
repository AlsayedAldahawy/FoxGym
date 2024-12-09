import { useState, useEffect } from "react";
import "../assets/css/editMemberInfo.css";
import useFetchData from "./fetchData";
import { claculateRemaining } from "../assets/js/calculatePayments";
import { calculateDate } from "../assets/js/auxFunctions";
import PropTypes from "prop-types";

const RenewSubscription = ({ member, onClose, onRenew }) => {
  const { payment, packages, loading, error } = useFetchData();

  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState("");
  const [renewDisable, setRenewDisable] = useState(true);

  useEffect(() => {
    if (!loading && !error) {
      setFormData({
        paid: 0,
        memberShip: member.memberShip || "",
        startDate: new Date().toISOString().split("T")[0] || "",
        expiryDate: "",
        program: member.program || "",
        discount: member.discount || 0,
        remaining: member.remaining || 0,
      });
    }
  }, [member, loading, error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      const updatedData = { ...prevState, [name]: value };

      const selectedPackage = packages?.find(
        (pkg) => pkg.packageName === updatedData.memberShip
      );
      const selectedPayment = payment?.find(
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
    setRenewDisable(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const success = await onRenew(member.id, formData);
      if (success) {
        setMessage("Member subscription updated successfully!");
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
        <h3 className="header-edit-text">Renew Member’s subscription</h3>
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
                    readOnly
                  />
                </label>
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
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="modal-actions">
            <button
              type="submit"
              disabled={renewDisable}
              className={`${
                renewDisable
                  ? "update-button-disabled update-button"
                  : "update-button"
              }`}
            >
              Renew
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

RenewSubscription.propTypes = {
  member: PropTypes.shape({
    id: PropTypes.string.isRequired,
    paid: PropTypes.number,
    memberShip: PropTypes.string,
    startDate: PropTypes.string,
    expiryDate: PropTypes.string,
    program: PropTypes.string,
    discount: PropTypes.number,
    remaining: PropTypes.number,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onRenew: PropTypes.func.isRequired,
};

export default RenewSubscription;
