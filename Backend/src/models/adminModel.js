import mongoose, { Schema } from "mongoose";


const adminSchema = new Schema({
    id: { type: String, required: true },
    userName: { type: String, required: true },
    password: { type: String, required: true },
    type: { type: String, required: true },
    gender: { type: String, required: false },
    phoneNumber: { type: String, required: false },
    speciality: { type: String, required: false },
    birthDate: { type: String, required: false },
    yearsOfExperience: { type: Number, required: false },
    email: { type: String, required: false },
    startDate: { type: String, required: true},
    bio: { type: String, required: false},
    weight: { type: Number, required: false },
    height: { type: Number, required: false },

})

const adminModel = mongoose.model('admins', adminSchema);

export default adminModel;
