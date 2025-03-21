import express from "express";
import { register } from "../services/memberService.js";
import memberModel from '../models/memberModel.js';
import { checkMembershipStatus } from '../utils/checkMembershipStatus.js';
import moment from 'moment';

const router = express.Router();

router.post("/addMember", async (request, response) => {
  try {
    const { userName, email, birthDate, memberShip, startDate, expiryDate,
      phoneNumber, program, height, weight, gender, image, discount, paid, remaining, joinDate } = request.body;

    const { statusCode, data } = await register({
      userName,
      email,
      birthDate,
      memberShip,
      startDate,
      expiryDate,
      phoneNumber,
      program,
      height,
      weight,
      gender,
      image,
      discount,
      paid,
      remaining,
      joinDate
    });
    response.status(statusCode).json(data);
  } catch (err) {
    console.error("Error in route:", err);
    response.status(500).send("Something went wrong!");
  }
});

// Backend API example (Node.js/Express with Mongoose)
router.get("/getAllMembers", async (req, res) => {
  const { page = 1, rowsPerPage = 10, searchQuery = '', genderQuery = '', statusQuery = '', membershipQuery = '', remainingQuery = '' } = req.query;

  const queryConditions = [
    {
      $or: [{ userName: { $regex: searchQuery, $options: 'i' } }
        , { id: { $regex: searchQuery, $options: 'i' } },
      { phoneNumber: { $regex: searchQuery, $options: 'i' } }]
    }];

  if (genderQuery) { queryConditions.push({ gender: genderQuery }); }
  if (statusQuery) { queryConditions.push({ status:statusQuery}); }
  if (membershipQuery) { queryConditions.push({ memberShip:membershipQuery}); }
  if (remainingQuery === "true") { queryConditions.push({ remaining: { $gt: 0 } }); }

  const totalMembers = await memberModel.countDocuments({
    $and: queryConditions
  });

  const totalPages = Math.ceil(totalMembers / rowsPerPage)
  const skiprev = (Number(page) != totalPages) ? totalMembers - (Number(page) * rowsPerPage) : 0


  try {
    // Use regex to perform a case-insensitive search across `username`, `id`, and `phoneNumber`
    const members = await memberModel.find({
      $and: queryConditions
    })
      .skip(skiprev)
      .limit(parseInt(Number(page) != totalPages ? rowsPerPage : (totalMembers - ((totalPages - 1) * rowsPerPage))));



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
  const { id } = req.params;

  try {
    const member = await memberModel.findOne({ id });

    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    const today = moment().format('YYYY-MM-DD');
    const isMarked = member.session.includes(today); // Check if attendance is already marked today

    res.status(200).json({ ...member.toObject(), isMarked });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching member' });
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
    res.status(200).json({ message: 'Attendance already marked for today', member });
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

router.delete('/delete', async (req, res) => {
  const { id } = req.body; // Extract ID from the request body

  if (!id) {
    return res.status(400).send({ message: 'Member ID is required.' });
  }

  try {
    // Find and delete the member
    const deletedMember = await memberModel.findOneAndDelete({ id }); // Assuming "id" is a unique field

    if (!deletedMember) {
      return res.status(404).send({ message: 'Member not found.' });
    }

    res.status(200).send({ message: 'Member deleted successfully.' });
  } catch (error) {
    console.error('Error deleting member:', error);
    res.status(500).send({ message: 'Error deleting member.' });
  }
});

router.post('/renewPackage', async (req, res) => {
  const { id, memberShip, startDate, expiryDate, program, discount, paid, remaining } = req.body;

  try {
    // Update the member's details in the database
    const result = await memberModel.updateOne(
      { id },
      {
        $set: {
          memberShip,
          startDate,
          expiryDate,
          program,
          discount,
          paid,
          remaining,
        },
      }
    );

    // Respond with success if the update was performed
    res.status(200).json({ message: "Member details updated successfully." });
  } catch (error) {
    console.error("Error updating member details:", error);

    // Handle any server errors
    res.status(500).json({ message: "Error updating member details." });
  }
});



router.post("/updateInfo", async (req, res) => {

  try {
    const member = await memberModel.findOne({ id: req.body.id });
    if (!member) {
      return res.status(404).json({ message: "Member not found." });
    }

    Object.entries(req.body).forEach(([key, value]) => {
      if (value) member[key] = value;
    });

    member.remaining = req.body.remaining;

    await member.save();

    res.status(200).json({ message: "Member information updated successfully!" });
  }





  catch (error) {
    console.error("Error updating member info:", error);
    res.status(500).json({ message: "Something went wrong." });
  }
});


export default router;
