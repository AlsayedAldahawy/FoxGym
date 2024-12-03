import mongoose from 'mongoose';
import { getAlladmins } from "./adminService.js";
import { getAllmembers } from "./memberService.js";
import { getAllPackages } from "./packagesService.js";
import { getAllPayment } from "./paymentService.js";
import fs from 'fs';
import adminModel from '../models/adminModel.js';


mongoose.connect('mongodb://localhost:27017/FoxGym');

mongoose.connection.on('connected', () => { console.log('MongoDB connected successfully'); });
mongoose.connection.on('error', (err) => { console.error('MongoDB connection error:', err); });


async function backupData() {
  try {
    const admins = await getAlladmins();
    const members = await getAllmembers();
    const packages = await getAllPackages();
    const payments = await getAllPayment();

    console.log(admins)
    console.log(members)

    fs.writeFile('D:\\admins.txt', JSON.stringify(admins), { flag: 'w' }, (err) => {
      if (err) {
        console.log("Error writing to file", err);
      } else {
        console.log("file written successfully");
      }
    });

    fs.writeFile('D:\\members.txt', JSON.stringify(members), { flag: 'w' }, (err) => {
      if (err) {
        console.log("Error writing to file", err);
      } else {
        console.log("file written successfully");
      }
    });

    // You can repeat similar steps for other data

  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Call the function directly
backupData();
