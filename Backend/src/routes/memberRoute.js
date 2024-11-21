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
    // Use regex to perform a case-insensitive search across `username`, `id`, and `phoneNumber`
    const members = await memberModel
      .find({
        $or: [
          { userName: { $regex: searchQuery, $options: 'i' } }, // Search by username
          { id: { $regex: searchQuery, $options: 'i' } }, // Search by id
          { phoneNumber: { $regex: searchQuery, $options: 'i' } } // Search by phoneNumber
        ]
      })
      .skip(skip)
      .limit(parseInt(rowsPerPage));

    const totalMembers = await memberModel.countDocuments({
      $or: [
        { userName: { $regex: searchQuery, $options: 'i' } }, // Search by username
        { id: { $regex: searchQuery, $options: 'i' } }, // Search by id
        { phoneNumber: { $regex: searchQuery, $options: 'i' } } // Search by phoneNumber
      ]
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

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const member = await memberModel.findOne({ id: id });
    if (!member) {
      return null; // Return null if the member is not found
    }
    res.status(201).json(member); // Return the member's data
  } catch (error) {
    console.error("Error fetching member by ID:", error);
    throw new Error("Database error"); // Throw an error to be caught in the route
  }
});


export default router;
