import { useState } from "react";
import "../assets/css/discountPayment.css";

const MemberFormInputs = ({ formData, handleChange, packages, payment }) => {
  const toggleExtraFields = () => {
    setShowExtraFields(!showExtraFields);
  };
  const [showExtraFields, setShowExtraFields] = useState(false);
  return (
    <>
      <div className="form-row" autoComplete="off">
        <div className="form-group" autoComplete="off">
          <label>
            Full Name <span className="required">*</span>{" "}
          </label>
          <input
            autoComplete="off"
            type="text"
            name="userName"
            placeholder="Enter Member's Full Name"
            className="form-control"
            value={formData.userName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>
            Gender <span className="required">*</span>
          </label>
          <select
            name="gender"
            className="form-control"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>
            Subscription Package <span className="required">*</span>
          </label>
          <select
            name="memberShip"
            className="form-control"
            value={formData.memberShip}
            onChange={handleChange}
          >
            <option value="">Select </option>
            {packages.map((pkg) => (
              <option key={pkg.id} value={pkg.packageName}>
                {pkg.packageName}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>
            Program <span className="required">*</span>
          </label>
          <select
            name="program"
            className="form-control"
            value={formData.program}
            onChange={handleChange}
          >
            <option value="">Select </option>
            {payment.map((pay) => (
              <option key={pay.id} value={pay.paymentName}>
                {pay.paymentName}
              </option>
            ))}
          </select>
        </div>

        <div className="apply-discount">
          <div className="form-group">
            <label>Discount %</label>
            <input
              autoComplete="off"
              type="number"
              name="discount"
              placeholder="Discount %"
              className="form-control"
              value={formData.discount}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>
              Paid <span className="required">*</span>
            </label>
            <input
              autoComplete="off"
              name="paid"
              placeholder="price paid"
              className="form-control"
              value={formData.paid}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Remaining</label>
            <input
              autoComplete="off"
              name="remaining"
              disabled="true"
              placeholder="remaining price"
              className="form-control"
              value={formData.remaining}
              onChange={handleChange}
              style={{ color: "#ed563b" }}
            />
          </div>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Start Date</label>
          <input
            autoComplete="off"
            type="date"
            name="startDate"
            className="form-control"
            value={formData.startDate}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            autoComplete="off"
            type="text"
            name="phoneNumber"
            placeholder="Enter Phone Number"
            className="form-control"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        <div
          className={`${!showExtraFields ? "extra-fields" : "main-fields"} `}
        >
          <div className="form-row">
            <div className="form-group">
              <label>Expiry Date</label>
              <input
                autoComplete="off"
                type="date"
                name="expiryDate"
                className="form-control"
                value={formData.expiryDate}
                readOnly
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                autoComplete="off"
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
              <label>Height</label>
              <input
                autoComplete="off"
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
                autoComplete="off"
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
              <label>Birth Date</label>
              <input
                autoComplete="off"
                type="date"
                name="birthDate"
                className="form-control"
                value={formData.birthDate}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Image URL</label>
              <input
                autoComplete="off"
                type="text"
                name="image"
                placeholder="Enter Image URL"
                className="form-control"
                value={formData.image}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="extra-fields-button">
        <div onClick={toggleExtraFields}>
          <div
            className={`${showExtraFields ? "click-animation" : ""}`}
            title={`${
              !showExtraFields ? "More information" : "Less information"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.293 9.293a1 1 0 0 1 1.414 0L12 12.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414Z"
              />
            </svg>
          </div>
          {/* {showExtraFields ? (
            "Less information"
          ) : (
            "More information"
          )} */}
        </div>
      </div>
    </>
  );
};

export default MemberFormInputs;
