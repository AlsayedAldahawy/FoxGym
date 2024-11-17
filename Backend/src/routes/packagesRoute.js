import express from 'express'
import { getAllPackages } from '../services/packagesService.js'
const  router = express.Router()

router.get('/', async(req, res) =>  {
    const packages = await getAllPackages();
    res.status(200).send(packages)
})
export default router;
