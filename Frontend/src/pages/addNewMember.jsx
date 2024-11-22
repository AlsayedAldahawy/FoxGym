import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MemberFormInputs from "../components/MemberFormInputs.jsx"; // Import the new MemberFormInputs component
import "../assets/css/addMember.css";
import bg from "../assets/images/backgrounds/bg_add_member.jpg";
const AddNewMember = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    birthDate: "",
    memberShip: "",
    startDate: new Date().toISOString().split("T")[0],
    expiryDate: "",
    phoneNumber: "",
    paymentStatus: "",
    height: "",
    weight: "",
    gender: "",
    image: "",
  });

  const [packages, setPackages] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch("http://localhost:5000/packages");
        const data = await response.json();
        setPackages(data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };
    fetchPackages();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };
      if (name === "memberShip") {
        const selectedPackage = packages.find(
          (pkg) => pkg.packageName === value
        );
        if (selectedPackage) {
          const startDate = new Date(updatedData.startDate);
          const expiryDate = new Date(startDate);
          expiryDate.setDate(
            startDate.getDate() + selectedPackage.numberOfDays
          );
          updatedData.expiryDate = expiryDate.toISOString().split("T")[0];
        }
      }
      return updatedData;
    });
  };

  const validateForm = () => {
    const {
      userName,
      email,
      birthDate,
      memberShip,
      startDate,
      expiryDate,
      phoneNumber,
      paymentStatus,
      height,
      weight,
      gender,
    } = formData;
    if (!userName || !memberShip || !paymentStatus || !gender)
      return "Please fill all the fields required (*)";
    //if (!/^\S+@\S+\.\S+$/.test(email)) return 'Invalid email address.';
    //if (isNaN(Number(height)) || isNaN(Number(weight))) return 'Height and Weight must be numeric values.';
    return "";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/member/addMember", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          height: parseFloat(formData.height),
          weight: parseFloat(formData.weight),
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Unable to add member. Please try again.");
        return;
      }
      setIsSubmitting(true);
      setSuccess("New member added successfully!");

      setTimeout(() => navigate("/members"), 1500);
    } catch (error) {
      console.error("API Error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <div className="background">
        <img src={bg} alt="" />
      </div>

      <div className="form-container">
        <form onSubmit={onSubmit}>
          <h3 className="text-center">Add New Member</h3>
          <MemberFormInputs
            formData={formData}
            handleChange={handleChange}
            packages={packages}
          />
          <div className="d-grid">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-signin"
            >
              {isSubmitting ? "Submitting..." : "Add Member"}
            </button>
          </div>
          {error && <p className="text-danger">{error}</p>}
          {success && <p className="text-success">{success}</p>}
        </form>
      </div>
    </>
  );
};

export default AddNewMember;
