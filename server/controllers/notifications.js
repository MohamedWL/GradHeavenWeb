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

export const fetchNotifications = async (req, res) => {
  const { userIdentification } = req.query;

  try {
    

    const updatedNotifications = await Notification.find({ receiver: userIdentification });
    res.json(updatedNotifications);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};



export const deleteNotification = async (req, res) => {
  const { senderId, receiverId, decision } = req.body;

  try {
    // Find the notification to be deleted
    const notification = await Notification.findOneAndDelete({
      sender: senderId,
      receiver: receiverId,
      notificationType: "Friend Request"
    });

    if (!notification) {
      // If the notification is not found, send a not found response
      return res.status(404).json({ message: "Notification not found" });
    }

    // Check if the decision is "Deny"
    if (decision === "Deny") {
      // If decision is "Deny", do nothing and send a success response
      return res.status(200).json({ message: "Notification deleted successfully" });
    }
    // Check if the decision is "Accept"
    if (decision === "Accept") {
      // Find the sender and receiver users
      const [sender, receiver] = await Promise.all([
        User.findById(senderId),
        User.findById(receiverId)
      ]);

      if (!sender || !receiver) {
        // If sender or receiver is not found, send a not found response
        return res.status(404).json({ message: "User not found" });
      }

      // Add the users to each other's friend list
      sender.friends.push(receiverId);
      receiver.friends.push(senderId);

      // Save the updated users
      await Promise.all([sender.save(), receiver.save()]);
    }

    // Send a success response
    return res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    // If an error occurs, send an error response
    console.error("An error occurred while deleting the notification:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};