import express from 'express'
import { getAllPayment } from '../services/paymentService.js'
const  router = express.Router()

router.get('/', async(req, res) =>  {
    const payment = await getAllPayment();
    res.status(200).send(payment)
})
export default router;
