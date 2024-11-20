import express from "express";
import { register } from "../services/memberService.js";
import memberModel from '../models/memberModel.js';


const router = express.Router();

router.post("/addMember", async (request, response) => {
  try {
    const { userName, email, birthDate, memberShip, startDate, expiryDate,
       phoneNumber, paymentStatus, height, weight, gender, image } = request.body;

    const { statusCode, data } = await register({
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
  const { page = 1, rowsPerPage = 10, searchQuery = '' } = req.query;
  const skip = (Number(page) - 1) * Number(rowsPerPage);

  try {
    // Use searchQuery to filter members by name or any other field
    const members = await memberModel
      .find({ userName: { $regex: searchQuery, $options: 'i' } }) // case-insensitive search
      .skip(skip)
      .limit(parseInt(rowsPerPage));
    
    const totalMembers = await memberModel.countDocuments({
      userName: { $regex: searchQuery, $options: 'i' },
    });

    // If no members found, return empty array and total count 0
    if (members.length === 0) {
      res.json({ members: [], totalMembers: 0 });
    } else {
      res.json({ members, totalMembers });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching members' });
  }
});


export default router;
