import express from "express";
import {
    getUser,
    getUserJobs,
    addRemoveSavedJobs,
    addFriend,
    removeFriend,
    getFriends,
    //CHATGPT Add controller modules that will allow a user to add friends
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();
//routes
//READ
router.get("/:id", verifyToken, getUser);
router.get("/:id/jobs", verifyToken, getUserJobs);
router.get("/:id/friends", verifyToken, getFriends);
router.patch("/:id/add-friend", verifyToken, addFriend);
router.delete("/:id/friends/:friendId", verifyToken, removeFriend);
//CHATGPT add route of the controller module that finds all the friend of a certain user 

//UPDATE
router.patch("/:id/jobId", verifyToken, addRemoveSavedJobs);
//CHATGPT add route of the controller module that adds a friend to a user
//CHATGPT add route of the controller module that removes the removes a friend of a user

export default router;

