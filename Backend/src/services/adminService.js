import adminModel from '../models/adminModel.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const getAlladmins = async () => {
  return await adminModel.find()
}

export const seedInitialAdmin = async () => {
  const admins = [
    {
      id: "FOX001",
      userName: "Mahmoud Farag",
      password: "123",
      type: "Administrator",
      gender: "male",
      phoneNumber: "",
      speciality: "",
      birthDate: "",
      yearsOfExperience: "",
      email: "",
      startDate: "2024-11-01",
      bio: "",
      weight: "",
      height: "",
    },
    {
      
      id: "FOX002",
      userName: "Amir Elsayed",
      password: "123",
      type: "Manager",
      gender: "male",
      phoneNumber: "",
      speciality: "",
      birthDate: "",
      yearsOfExperience: "",
      email: "",
      startDate: "2024-11-01",
      bio: "",
      weight: "",
      height: "",
    },
    {
      id: "FOX111",
      userName: "Mohamed Shaker",
      password: "123",
      type: "Coach",
      gender: "male",
      phoneNumber: "",
      speciality: "",
      birthDate: "",
      yearsOfExperience: "",
      email: "",
      startDate: "2024-11-30",
      bio: "",
      weight: "",
      height: "",
    },
    {
      id: "FOX122",
      userName: "Amal Elsayed",
      password: "123",
      type: "Coach",
      gender: "female",
      phoneNumber: "",
      speciality: "",
      birthDate: "",
      yearsOfExperience: "",
      email: "",
      startDate: "2024-11-28",
      bio: "",
      weight: "",
      height: "",
    },
    {
      id: "FOX133",
      userName: "Hend Lewazy",
      password: "123",
      type: "Coach",
      gender: "female",
      phoneNumber: "",
      speciality: "",
      birthDate: "",
      yearsOfExperience: "",
      email: "",
      startDate: "2024-11-28",
      bio: "",
      weight: "",
      height: "",
    },
  ];

  // Hash passwords
  for (let admin of admins) {
    admin.password = await bcrypt.hash(admin.password, 10);
  }


  const existedAdmins = await getAlladmins();
  if (existedAdmins.length === 0) {
    await adminModel.insertMany(admins)
  }
}

export const login = async ({ userName, password }) => {
  const findUser = await adminModel.findOne({ userName });

  if (!findUser) {
    return { data: "Incorrect email or password!", statusCode: 400 };
  }

  const passwordMatch = await bcrypt.compare(password, findUser.password);
  if (passwordMatch) {
    const token = generateJWT({ userName: findUser.userName });
    return {
      data: {
        username: findUser.userName,
        token: token,
      },
      statusCode: 200,
    };
  }
  return { data: "Incorrect email or password!", statusCode: 400 };
};

const generateJWT = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET || '');
};
