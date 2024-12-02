import express from "express";
import { login, getAlladmins } from "../services/adminService.js";
import adminModel from '../models/adminModel.js';
import bcrypt from "bcrypt";

const router = express.Router();

router.get('/', async (req, res) => {
  const admins = await getAlladmins();
  res.status(200).send(admins)
})

router.post("/login", async (request, response) => {
  try {
    const { userName, password } = request.body;
    const { statusCode, data } = await login({ userName, password });
    response.status(statusCode).json(data);
  } catch {
    response.status(500).send("Something went wrong!");
  }
});

router.post('/updatePassword', async (req, res) => {
  const { userName, oldPassword, newPassword } = req.body;

  try {
    // Find the admin by userName
    const admin = await adminModel.findOne({ userName });

    // Check if the admin exists
    if (!admin) {
      return res.status(404).send({ message: "User not found." });
    }

    // Check if the old password is correct
    const isMatch = await bcrypt.compare(oldPassword, admin.password);
    if (!isMatch) {
      return res.status(400).send({ message: "Incorrect old password." });
    }

    // Hash the new password and update it
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedPassword;
    await admin.save();

    res.status(200).send({ message: "Password updated successfully." });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).send({ message: "An error occurred while updating the password." });
  }
});

router.post("/updateInfo", async (req, res) => {
  const {userName, gender, email, phoneNumber, birthDate, height, weight, speciality, yearsOfExperience, bio } = req.body;

  try {
    const coach = await adminModel.findOne({ userName });
    if (!coach) {
      return res.status(404).json({ message: "Member not found." });
    }

    // Update fields only if provided
    if (gender) coach.gender = gender;
    if (email) coach.email = email;
    if (phoneNumber) coach.phoneNumber = phoneNumber;
    if (birthDate) coach.birthDate = birthDate;
    if (height) coach.height = height;
    if (weight) coach.weight = weight;
    if (speciality) coach.speciality = speciality;
    if (yearsOfExperience) coach.yearsOfExperience = yearsOfExperience;
    if (bio) coach.bio = bio;

    

    await coach.save();

    res.status(200).json({ message: "Coach information updated successfully!" });
  } catch (error) {
    console.error("Error updating coach info:", error);
    res.status(500).json({ message: "Something went wrong." });
  }
});



export default router;
