import express from "express";
import { createNotification, getNotificationsByUser,fetchNotifications,deleteNotification} from "../controllers/notifications.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();
router.post("/createnotification", createNotification);
router.get("/getnotificationstouser", getNotificationsByUser);
router.get("/fetchnotifications", fetchNotifications);
router.delete("/deletenoti", deleteNotification)

export default router;