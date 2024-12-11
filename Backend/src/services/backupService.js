import { getAlladmins } from "./adminService.js";
import { getAllmembers } from "./memberService.js";
import { getAllPackages } from "./packagesService.js";
import { getAllPayment } from "./paymentService.js";
import fs from 'fs';

// added for seperate testing
// mongoose.connect('mongodb://localhost:27017/FoxGym');

// mongoose.connection.on('connected', () => { console.log('MongoDB connected successfully'); });
// mongoose.connection.on('error', (err) => { console.error('MongoDB connection error:', err); });


export default async function backupData(filePath, username) {
  try {
    const date = new Date().toISOString()
    let admins = JSON.stringify(await getAlladmins());
    let members = JSON.stringify(await getAllmembers());
    const packages = await getAllPackages();
    const payments = await getAllPayment();

    admins = JSON.parse(admins);
    members = JSON.parse(members);

    admins = admins.map((admin) => {
      const { _id, ...rest } = admin
      return rest;
    })

    members = members.map((member) => {
      const { _id, ...rest } = member
      return rest;
    })


    console.log(admins)

    const adminsWithMetadata = { createdBy: username, createdAt: date, data: admins };
    const membersWithMetadata = { createdBy: username, createdAt: date, data: members };
    const packagesWithMetadata = { createdBy: username, createdAt: date, data: packages };
    const paymentsWithMetadata = { createdBy: username, createdAt: date, data: payments };



    const dateForm = date.replace(/:/g, '');
    // Save each file and capture errors
    await saveFile(`${filePath}\\admins_${dateForm}.json`, adminsWithMetadata);
    await saveFile(`${filePath}\\members_${dateForm}.json`, membersWithMetadata);
    await saveFile(`${filePath}\\packages_${dateForm}.json`, packagesWithMetadata);
    await saveFile(`${filePath}\\payments_${dateForm}.json`, paymentsWithMetadata);
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
