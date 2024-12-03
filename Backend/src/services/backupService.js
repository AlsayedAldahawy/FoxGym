import { getAlladmins } from "./adminService.js";
import { getAllmembers } from "./memberService.js";
import { getAllPackages } from "./packagesService.js";
import { getAllPayment } from "./paymentService.js";
import fs from 'fs';


// added for seperate testing
// mongoose.connect('mongodb://localhost:27017/FoxGym');

// mongoose.connection.on('connected', () => { console.log('MongoDB connected successfully'); });
// mongoose.connection.on('error', (err) => { console.error('MongoDB connection error:', err); });


export default async function backupData(filePath) {
  try {
    const admins = await getAlladmins(); 
    const members = await getAllmembers(); 
    const packages = await getAllPackages(); 
    const payments = await getAllPayment(); 
    
    // Save each file and capture errors 
    await saveFile(`${filePath}\\admins.json`, admins);
    await saveFile(`${filePath}\\members.json`, members);
    await saveFile(`${filePath}\\packages.json`, packages);
    await saveFile(`${filePath}\\payments.json`, payments);
  } catch (error) {
    console.error("Error during backup:", error);
    throw new Error(`Backup failed: ${error.message}`);
  }
}


function saveFile(filePath, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(data), { flag: 'w' }, (err) => {
      if (err) {
        console.error(`Error writing to file ${filePath}:`, err);
        reject(`Failed to save file ${filePath}`);
      }
      else { console.log(`File ${filePath} written successfully`); resolve(); }
    });
  });
}

// Call the function directly
// backupData();
