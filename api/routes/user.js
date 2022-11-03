import express from "express";
import { getUsers }  from "../controllers/userController.js"

const router = express.Router()
router.get('/find/:userId', getUsers)

export default router;