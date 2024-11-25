import memberModel from '../models/memberModel.js';
import { uidGenerator } from './uniqueId.js'; // Adjust the path based on your project structure


export const register = async ({ userName, email, birthDate, memberShip, startDate, expiryDate,
   phoneNumber, program, height, weight, gender, image, discount, paied, remaining }) => {
  try {
    //const findUser = await memberModel.findOne({ email });

    //if (findUser) {
    //  return { data: "User already exists!", statusCode: 400 };
    //}
    
    // Generate a unique ID
    const id = uidGenerator();

    const newUser = new memberModel({
      id,
      userName,
      email,
      birthDate,
      memberShip,
      startDate,
      expiryDate,
      phoneNumber,
      program,
      height,
      weight,
      gender,
      image,
      discount,
      paied,
      remaining
    });
    await newUser.save();

    return { data: { id, userName, email, birthDate, memberShip, startDate,
       expiryDate, phoneNumber, program, height, weight, gender, image, discount, paied, remaining }, statusCode: 200 };
  } catch (err) {
    console.error("Error in register function:", err);
    throw err;
  }
};
