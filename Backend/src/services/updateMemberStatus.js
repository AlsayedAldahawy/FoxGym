import moment from 'moment'; // For date handling
import memberModel from '../models/memberModel.js';

const updateMemberStatus = async () => {
    const today = moment().startOf('day').toISOString(); // Current date at midnight

    try {
        // Update members with expired subscriptions
        const result = await memberModel.updateMany(
            { expiryDate: { $lt: today }, status: 'active' }, // Expired and still active
            { $set: { status: 'inactive' } }                 // Set status to inactive
        );

        console.log(`${result.modifiedCount} member(s) updated to inactive.`);
    } catch (err) {
        console.error('Error updating member statuses:', err);
    }
};

export default updateMemberStatus;
