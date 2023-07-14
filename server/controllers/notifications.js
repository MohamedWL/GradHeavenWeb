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

export const getNotificationsByUser = async (req, res) => {
  const { userIdentification } = req.query;

  try {
    const notificationCount = await Notification.countDocuments({
      receiver: userIdentification,
      read: { $ne: true },
    });
    
    res.status(200).json({ count: notificationCount });
  } catch (error) {
    console.error("Error retrieving notifications for this user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const readNotifications = async (req, res) => {
  const { userIdentification } = req.query;

  try {
    // Find notifications with the provided receiver attribute and update their read attribute
    const notifications = await Notification.updateMany(
      { receiver: userIdentification },
      { read: true }
    );

    res.json({ success: true, notifications });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};