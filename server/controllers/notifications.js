import Notification from "../models/Notification.js";
import User from "../models/User.js";

export const createNotification = async (req, res) => {
    const { senderId, receiverId, notificationType } = req.body;
  
    try {
      const notification = new Notification({
        sender: senderId,
        receiver: receiverId,
        notificationtype: notificationType,
        read: false,
      });
  
      await notification.save();
  
      res.status(201).json({ message: "Notification created successfully" });
    } catch (error) {
      res.status(500).json({ message: "Notification creation failed" });
    }
};