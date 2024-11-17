import express from "express";
import { register } from "../services/memberService.js";
import memberModel from '../models/memberModel.js';


const router = express.Router();

router.post("/addMember", async (request, response) => {
  try {
    const { id, userName, email, birthDate, memberShip, startDate, expiryDate,
       phoneNumber, paymentStatus, height, weight, gender, image } = request.body;
    console.log(request.body);

    const { statusCode, data } = await register({
      id,
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
      image,
    });
    response.status(statusCode).json(data);
  } catch (err) {
    console.error("Error in route:", err);
    response.status(500).send("Something went wrong!");
  }
});

router.get("/getAllMembers", async (req, res) => {
  try {
    const members = await memberModel.find();  // Fetch all members from the database
    res.status(200).json(members);
  } catch (err) {
    console.error("Error fetching members:", err);
    res.status(500).send("Something went wrong!");
  }
});

export default router;
