import memberModel from '../models/memberModel.js';

export const register = async ({ id, userName, email, birthDate, memberShip, startDate, expiryDate,
   phoneNumber, paymentStatus, height, weight, gender, image }) => {
  try {
    const findUser = await memberModel.findOne({ email });

    if (findUser) {
      return { data: "User already exists!", statusCode: 400 };
    }

    const newUser = new memberModel({
      id,
      userName,
      email,
      birthDate,
      memberShip,
      startDate,
      expiryDate,
      phoneNumber,
      paymentStatus,
      height,
      weight,
      gender,
      image,
    });
    await newUser.save();

    return { data: { id, userName, email, birthDate, memberShip, startDate,
       expiryDate, phoneNumber, paymentStatus, height, weight, gender, image }, statusCode: 200 };
  } catch (err) {
    console.error("Error in register function:", err);
    throw err;
  }
};
