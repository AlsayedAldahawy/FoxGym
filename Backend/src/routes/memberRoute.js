import express from "express";
import { register } from "../services/memberService.js";
import memberModel from '../models/memberModel.js';
import { checkMembershipStatus } from '../utils/checkMembershipStatus.js';
import moment from 'moment';

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

// Mark attendance for a member
router.post('/attendance', async (req, res) => {
  const { id } = req.body;

  try {
    const member = await memberModel.findOne({ id });

    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    // Check current membership status before incrementing attendance
    const currentStatus = checkMembershipStatus(member);
    if (currentStatus === 'inactive') {
      return res.status(403).json({ 
        message: 'Member cannot attend further. Either the package has expired or the max attendance has been reached.' 
      });
    }


    // Add today's date to the sessions array
    const today = moment().format('YYYY-MM-DD');
    member.session.push(today);
    member.attentanceMatrix.push(today);


    // Update status after attendance
    const newStatus = checkMembershipStatus(member);
    if (member.status !== newStatus) {
      member.status = newStatus; // Only update if status has changed
    }

    // Save member with updated attendance and status
    await member.save();

    // Send updated member back to client
    res.status(200).json({ message: 'Attendance marked successfully', member });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating attendance' });
  }
});


// Reset member's attendance and status
router.post('/resetAttendance', async (req, res) => {
  const { id } = req.body;

  try {
    const member = await memberModel.findOne({ id });

    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    // Reset the attendance and status
    member.session = [];
    member.status = 'active';

    await member.save();

    res.status(200).json({ message: 'Attendance reset successfully', member });
  } catch (error) {
    console.error('Error resetting attendance:', error);
    res.status(500).json({ message: 'Error resetting attendance' });
  }
});

// Remove the latest attendance mark
router.post('/unattend', async (req, res) => {
  const { id } = req.body;

  try {
    const member = await memberModel.findOne({ id });

    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    // Remove the last attendance date
    if (member.session.length > 0) {
      member.session.pop(); // Remove the last session
      member.attentanceMatrix.pop(); // Remove the last session from matrix
      await member.save();
      return res.status(200).json({ message: 'Attendance removed successfully', member });
    }

    return res.status(400).json({ message: 'No attendance to remove.' });
  } catch (error) {
    console.error('Error removing attendance:', error);
    res.status(500).json({ message: 'Error removing attendance' });
  }
});


export default router;
