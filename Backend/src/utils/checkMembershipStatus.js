import moment from 'moment';

// Check membership status
export const checkMembershipStatus = (member) => {
  const today = moment();
  const expiryDate = moment(member.expiryDate);

  console.log('Checking membership status for member:', member.userName); // Debugging log
  console.log('Attendance:', member.session);
  console.log('Expiry Date:', expiryDate.format('YYYY-MM-DD'));

  // If attendance has reached max days or package expired, mark as inactive
  if (member.session.length >= getMaxAttendance(member.memberShip) || today.isAfter(expiryDate)) {
    console.log('Status set to inactive');
    return 'inactive';
  }
  console.log('Status set to active');
  return 'active';
};

// Get max attendance days based on the package
const getMaxAttendance = (packageType) => {
  const packageDays = {
    'Annual': 365,         // Annual package
    'Semi-annual': 183,    // Semi-annual package
    'Quarterly': 91,       // Quarterly package
    'Monthly': 30,         // Monthly package
    'Semi-monthly': 12,    // Semi-monthly package, adjusted to match "half-month"
  };
  return packageDays[packageType] || 0; // Default to 0 if package type is unknown
};
