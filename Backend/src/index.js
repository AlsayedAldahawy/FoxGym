import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors';
import memberRoute from './routes/memberRoute.js';


dotenv.config()

const app = express()
const port = 5000;

app.use(express.json())
app.use(cors());


mongoose
    .connect('mongodb://localhost:27017/FoxGem')
    .then(() => console.log('Mongo Connected Successfully!'))
    .catch((err) => console.log('Failed to connect to MongoDB', err));


app.use("/member", memberRoute);


app.listen(port, () =>{
    console.log(`Server Is Running On Port ${port}`);
});