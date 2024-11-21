import cron from 'node-cron';
import memberModel from '../models/memberModel.js';
import { checkMembershipStatus } from '../utils/membershipUtils.js';

// Schedule a cron job to run every day at midnight
cron.schedule('0 0 * * *', async () => {
  console.log('Running daily status check...');
  try {
    const members = await memberModel.find();

    for (const member of members) {
      // Update status
      const newStatus = checkMembershipStatus(member);
      if (member.status !== newStatus) {
        member.status = newStatus;
        await member.save();
      }
    }

    console.log('Daily status check complete.');
  } catch (error) {
    console.error('Error during daily status check:', error);
  }
});
