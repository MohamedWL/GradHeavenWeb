import Notification from "../models/Notification.js";
import User from "../models/User.js";

export const createNotification = async (req, res) => {
  const { senderId, receiverId, notiType } = req.body;

  try {
    // Check if a notification with the same sender, receiver, and notificationType exists
    const existingNotification = await Notification.findOne({
      sender: senderId,
      receiver: receiverId,
      notificationType: notiType,
    });

    if (existingNotification) {
      return res.status(409).json({ message: "Notification already exists" });
    }

    const notification = new Notification({
      sender: senderId,
      receiver: receiverId,
      notificationType: notiType,
      read: false,
      timestamp: Date.now(),
    });

    await notification.save();

    res.status(201).json({ message: "Notification created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Notification creation failed" });
  }
};