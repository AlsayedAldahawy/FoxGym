import mongoose, { Schema } from "mongoose";


const packagesSchema = new Schema({
    id: {type: String, required: true },
    packageName: { type: String, required: true },
    numberOfDays: { type: Number, required: true },
})

const packagesModel = mongoose.model('Packages', packagesSchema);

export default packagesModel;