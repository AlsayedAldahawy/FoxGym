/**
 * Generates a unique identifier based on the current date and time.
 * The UID format: YYYYMM-HHDD-MMSS
 *
 * @returns {string} - The generated unique identifier
 */
function uidGenerator() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    // Create a new Date object to get the current date and time
    let date = new Date();
    const year = date.getFullYear();

    // Yearly and quarter century dependent character calculation
    let yearChar = chars[year % 26];
    let qCentury = chars[Math.floor(year / 25) - 82];

    yearChar += (Math.floor(year / 25) > 81) ? qCentury : "";

    // Monthly dependent character calculation
    let month = date.getMonth();
    let janJam = (month) ? 1 : 3;
    let monthChar = chars[randomNumberRange(0, janJam) + (month * 2) + 3 - janJam];

    // Daily & hourly & minute & second dependent character calculation
    let dayChar = chars[date.getDate()];
    let minChar = String(date.getMinutes()).padStart(2, '0');
    let hourChar = chars[date.getHours()];
    let secChar = String(date.getSeconds()).padStart(2, '0');

    // Combine the calculated characters to form the unique identifier
    let uid = yearChar + monthChar + hourChar + dayChar + "-" + minChar + secChar;
    return uid;
}

/**
 * Generates a random number between the specified minimum and maximum values.
 *
 * @param {number} min - The minimum value
 * @param {number} max - The maximum value
 * @returns {number} - A random number between min and max
 */
function randomNumberRange(min, max) {
    return Math.floor(Math.random() * ((max - min) + 1)) + min;
}

export { uidGenerator };

// Test the uidGenerator function
console.log(uidGenerator());
setTimeout(() => { console.log(uidGenerator()); }, 1000);
setTimeout(() => { console.log(uidGenerator()); }, 2000);
setTimeout(() => { console.log(uidGenerator()); }, 3000);
setTimeout(() => { console.log(uidGenerator()); }, 4000);
setTimeout(() => { console.log(uidGenerator()); }, 5000);
setTimeout(() => { console.log(uidGenerator()); }, 6000);
setTimeout(() => { console.log(uidGenerator()); }, 7000);
setTimeout(() => { console.log(uidGenerator()); }, 8000);
setTimeout(() => { console.log(uidGenerator()); }, 9000);
setTimeout(() => { console.log(uidGenerator()); }, 10000);
