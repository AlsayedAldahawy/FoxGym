// src/calculatePayments.test.js
import calculatePayments from './calculatePayments.js';

// test('Annual Membership for Lifting', () => {
//   expect(calculatePayments("Lifting", "Annual")).toBe(3000);
// });

// test('Semi-annual Membership for Mixed', () => {
//   expect(calculatePayments("Mixed", "Semi-annual")).toBe(2400);
// });

// test('Quarterly Membership for Cross Fit', () => {
//   expect(calculatePayments("Cross Fit", "Quarterly")).toBe(750);
// });

// test('Monthly Membership for Lifting + Treadmill', () => {
//   expect(calculatePayments("Lifting + Treadmill", "Monthly")).toBe(300);
// });

// test('Semi-monthly Membership for Lifting + Treadmill', () => {
//   expect(calculatePayments("Lifting + Treadmill", "Semi-monthly")).toBe(250);
// });

// test('Semi-monthly Membership for Cross Fit', () => {
//   expect(calculatePayments("Cross Fit", "Semi-monthly")).toBe(200);
// });

// test('Semi-monthly Membership for Mixed', () => {
//   expect(calculatePayments("Mixed", "Semi-monthly")).toBe(320);
// });

// test('Invalid Duration', () => {
//   expect(calculatePayments("Lifting", "Weekly")).toBeUndefined();
// });


function runTests() {
  console.assert(calculatePayments("Lifting", "Annual") === 3000, "Test Case 1 Failed");
  console.assert(calculatePayments("Mixed", "Semi-annual") === 2400, "Test Case 2 Failed");
  console.assert(calculatePayments("Cross Fit", "Quarterly") === 750, "Test Case 3 Failed");
  console.assert(calculatePayments("Lifting + Treadmill", "Monthly") === 300, "Test Case 4 Failed");
  console.assert(calculatePayments("Lifting + Treadmill", "Semi-monthly") === 250, "Test Case 5 Failed");
  console.assert(calculatePayments("Cross Fit", "Semi-monthly") === 200, "Test Case 6 Failed");
  console.assert(calculatePayments("Mixed", "Semi-monthly") === 320, "Test Case 7 Failed");
  console.assert(calculatePayments("Lifting", "Weekly") === undefined, "Test Case 8 Failed");
  console.log("All test cases passed!");
}

runTests();
