import mongoose, { Schema } from "mongoose";


const memberSchema = new Schema({
    id: { type: String},
    userName: { type: String, required: true },
    memberShip: { type: String, required: true},
    startDate: { type: String, required: true},
    expiryDate: { type: String, required: true},
    paymentStatus: { type: String, required: true},
    gender: { type: String, required: true},
    email: { type: String },
    birthDate: { type: String },
    phoneNumber: { type: String },
    height: { type: Number },
    weight: { type: Number },
    image: { type: String },
    status: { type: String, default: 'active' }, // 'active' or 'inactive'
    session: { type: [String], default: [] }, // Array of session dates
    attentanceMatrix: { type: [String], default: [] },
})

const memberModel = mongoose.model('Members', memberSchema);

export default memberModel;
