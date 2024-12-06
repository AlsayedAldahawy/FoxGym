// src/calculatePayments.js
export const calculatePayments = (program, duration) => {
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

export const claculateRemaining = (pkg, payment, discount, paid) => {
  if (!pkg || !payment) {
    return;
  }

  if (!discount) {
    discount = 0;
  }

  const packageMonths = Math.floor(pkg.numberOfDays / 30);

  const durationConstatnt =
  pkg.packageName  === "Semi-monthly" ? 0.8 : packageMonths;

  const treadmillOverPrice =
  pkg.packageName === "Semi-monthly" &&
  payment.paymentName.includes("Treadmill")
      ? 10 * packageMonths
      : 0;

  return (
    durationConstatnt * payment.price * (1 - discount / 100) +
    treadmillOverPrice - paid
  );
};
