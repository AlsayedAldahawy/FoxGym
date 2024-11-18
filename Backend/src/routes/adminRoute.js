import express from "express";
import { login, getAlladmins } from "../services/adminService.js";

const router = express.Router();

router.get('/', async(req, res) =>  {
    const admins = await getAlladmins();
    res.status(200).send(admins)
})

router.post("/login", async (request, response) => {
    try {
      const { userName, password } = request.body;
      const { statusCode, data } = await login({ userName, password });
      response.status(statusCode).json(data);
    } catch {
      response.status(500).send("Something went wrong!");
    }
  });

export default router;