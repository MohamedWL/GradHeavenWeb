import express from "express";
import { createNotification } from "../controllers/notifications.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();
router.get("/createnoti", createNotification);

export default router;