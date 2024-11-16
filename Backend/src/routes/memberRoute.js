import express from "express";
import { register } from "../services/memberService.js";

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

export default router;
