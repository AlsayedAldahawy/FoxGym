import mongoose, { Schema } from "mongoose";


const paymentSchema = new Schema({
    id: {type: String, required: true },
    paymentName: { type: String, required: true },
    price: { type: Number, required: true },
})

const paymentModel = mongoose.model('payment', paymentSchema);

export default paymentModel;