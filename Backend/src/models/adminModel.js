import mongoose, { Schema } from "mongoose";


const adminSchema = new Schema({
    userName: { type: String, required: true },
    password: { type: String, required: true },
    type: { type: String, required: true },
    phoneNumber: { type: String, required: false },
    speciality: { type: String, required: false },
    birthDate: { type: String, required: false },
    yearsOfExperience: { type: Number, required: false },
    employmentStartDate: { type: String, required: true },
    email: { type: String, required: false },
    socialMedia: { linkedIn: String, instagram: String, },
})

const adminModel = mongoose.model('admins', adminSchema);

export default adminModel;
