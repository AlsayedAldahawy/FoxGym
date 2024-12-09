import axios from "axios";

export function calculateAge(birthDateString) {
  const [year, month, day] = birthDateString.split("-");
  const birthDate = new Date(`${year}-${month}-${day}`);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
}

export const autoBackup = async () => {

  try {
    await axios.post("http://localhost:5000/backup", {
      filePath: "C:\\foxsys\\data\\db",
      username: "auto - backup",
    });
  } catch (error) {
    console.error("Error during backup:", error);
  }
};

export const calculateDate = (startDate, pkg) => {
  // console.log(startDate, pkg)
  const futureDate = new Date(startDate);
  const expiryDate = new Date(futureDate);
  expiryDate.setDate(
    futureDate.getDate() + pkg.numberOfDays
  );
  return expiryDate.toISOString().split("T")[0];

}
