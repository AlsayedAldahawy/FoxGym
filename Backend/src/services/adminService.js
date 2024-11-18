import adminModel from '../models/adminModel.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const getAlladmins = async() => {
    return await adminModel.find()
}

export const seedInitialAdmin = async () => {
    const admins = [
      {
        userName: "Mahmoud Farag",
        password : "123",
        type: "admin",
      },
      {
        userName: "Amir Elsayed",
        password : "456",
        type: "admin",
      },
      {
        userName: "Merna Hossam",
        password : "789",
        type: "coach",
      },
      {
        userName: "Wessam Abdelnabi",
        password : "1011",
        type: "coach",
      },
      {
        userName: "Elsayed Eldahawy",
        password : "1213",
        type: "admin",
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
      return {
        data: generateJWT({
          userName: findUser.userName,
        }),
        statusCode: 200,
      };
    }
  
    return { data: "Incorrect email or password!", statusCode: 400 };
  };
  
  const generateJWT = (data) => {
    return jwt.sign(data, process.env.JWT_SECRET || '');
  };