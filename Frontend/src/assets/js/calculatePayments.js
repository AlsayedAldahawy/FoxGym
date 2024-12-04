// src/calculatePayments.js
const calculatePayments = (program, duration) => {
  const durations = {
    "Annual": 12,
    "Semi-annual": 6,
    "Quarterly": 3,
    "Monthly": 1,
  };

  const programs = {
    "Lifting": 250,
    "Lifting + Treadmill": 300,
    "Cross Fit": 250,
    "Mixed": 400,
  };

  if (duration in durations) {
    return programs[program] * durations[duration];
  }

  if (duration === "Semi-monthly") {
    if (program === "Lifting + Treadmill") {
      return 250;
    } else {
      return 0.8 * programs[program];
    }
  }
};

export default calculatePayments;
