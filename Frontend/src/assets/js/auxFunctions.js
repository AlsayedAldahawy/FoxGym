import { useState } from "react";
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
        filePath: "D:\\sys\\data\\db",
        username: "auto - backup",
      });
    } catch (error) {
      console.error("Error during backup:", error);
    }
  };
