import mongoose, { Schema } from "mongoose";


const adminSchema = new Schema({
    userName: { type: String, required: true },
    password: { type: String, required: true },
    type: { type: String, required: true },
})

const adminModel = mongoose.model('admins', adminSchema);

export default adminModel;