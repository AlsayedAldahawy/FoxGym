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

// Backend API example (Node.js/Express with Mongoose)
router.get("/getAllMembers", async (req, res) => {
  const { page = 1, rowsPerPage = 10 } = req.query; // Default values for page and rowsPerPage
  const skip = (Number(page) - 1) * Number(rowsPerPage);

  try {
    const members = await memberModel.find().skip(skip).limit(parseInt(rowsPerPage));
    const totalMembers = await memberModel.countDocuments();

    res.json({ members, totalMembers });

  } catch (error) {
    res.status(500).json({ error: 'Error fetching members' });
  }
});


export default router;
