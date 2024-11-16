import mongoose, { Schema } from "mongoose";


const memberSchema = new Schema({
    id: { type: String, required: true },
    userName: { type: String, required: true },
    email: { type: String, required: true},
    birthDate: { type: String, required: true},
    memberShip: { type: String, required: true},
    startDate: { type: String, required: true},
    expiryDate: { type: String, required: true},
    phoneNumber: { type: String, required: true},
    paymentStatus: { type: String, required: true},
    height: { type: Number, required: true},
    weight: { type: Number, required: true},
    gender: { type: String, required: true},
    email: { type: String, required: true},
    image: { type: String }
})

const memberModel = mongoose.model('Members', memberSchema);

export default memberModel;