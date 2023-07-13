import express from "express";
import { createNotification } from "../controllers/notifications.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();
router.post("/createnotification", createNotification);

export default router;