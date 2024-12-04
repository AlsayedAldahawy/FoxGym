import express from 'express'
import { getAllPayment } from '../services/paymentService.js'
import paymentModel from '../models/paymentModel.js'
const router = express.Router()

router.get('/', async (req, res) => {
    const payment = await getAllPayment();
    res.status(200).send(payment)
})

router.get('/getPayment', async (req, res) => {
    const paymentName = req.query.paymentName;
    console.log("payment name", paymentName);
    // console.log("request body", req.body);
    // console.log("request params", req.params);
    // console.log("request query", req.query);

    try {
        const payment = await paymentModel.findOne({ paymentName });
        if (!payment)
            return res.status(404).send({ message: "Payment not found." })
        res.status(200).send(payment)
        console.log("payment",payment)
    } catch (error) {
        console.error("Error fetching payment:", error);
        res.status(500).send({ message: "An error occurred while fetching payment." });
    }

})

export default router;
