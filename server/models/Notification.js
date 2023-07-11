import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
    {
        sender: {
            type: String,
            required: true,
        },
        receiver: {
            type: String,
            required: true,
        },
        notificationtype: {
            type: String,
            required: true,
        },
        read: {
            type: Boolean,
            default:false,
            required: true,
        },
        timestamp: {
            type: Date,
            default: Date.now,
        },
    },
);

const Notification = mongoose.model("Notification", NotificationSchema);
export default Notification;