import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors';
import memberRoute from './routes/memberRoute.js';
import packageRoute from './routes/packagesRoute.js';
import adminRoute from './routes/adminRoute.js'
import paymentRoute from './routes/paymentRoute.js'
import { seedInitialPackages } from './services/packagesService.js' ;
import { seedInitialAdmin } from './services/adminService.js';
import { seedInitialPayment } from './services/paymentService.js'


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
app.use("/packages", packageRoute)
app.use("/admin", adminRoute);
app.use("/payment", paymentRoute)



seedInitialPackages()
seedInitialAdmin()
seedInitialPayment()

app.listen(port, () =>{
    console.log(`Server Is Running On Port ${port}`);
});
