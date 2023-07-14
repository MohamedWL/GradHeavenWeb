import express from "express";
import { createNotification, getNotificationsByUser,readNotifications} from "../controllers/notifications.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();
router.post("/createnotification", createNotification);
router.get("/getnotificationstouser", getNotificationsByUser);
router.get("/readnotifications", readNotifications);

export default router;