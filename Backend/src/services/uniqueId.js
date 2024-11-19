export function uidGenerator() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  
    let date = new Date();
    const year = date.getFullYear();
    let yearChar = chars[year % 26];
    let qCentury = chars[Math.floor(year / 25) - 82];
    yearChar += (Math.floor(year / 25) > 81) ? qCentury : "";
  
    let month = date.getMonth();
    let janJam = (month) ? 1 : 3;
    let monthChar = chars[randomNumberRange(0, janJam) + (month * 2) + 3 - janJam];
  
    let dayChar = chars[date.getDate()];
    let minChar = String(date.getMinutes()).padStart(2, '0');
    let hourChar = chars[date.getHours()];
    let secChar = String(date.getSeconds()).padStart(2, '0');
  
    let uid = yearChar + monthChar + hourChar + dayChar + "-" + minChar + secChar;
    return uid;
  }
  
  function randomNumberRange(min, max) {
    return Math.floor(Math.random() * ((max - min) + 1)) + min;
  }
  