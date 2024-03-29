import express from "express";
import {
    getUser,
    getUserByFullName,
    removeFriend,
    getAllUser,
    updateUser,
    //CHATGPT Add controller modules that will allow a user to add friends
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";


const router = express.Router();
//routes
//READ
router.get("/allusers", getAllUser);
router.get("/userbyfullname", getUserByFullName);
router.get("/:id", verifyToken, getUser);
router.put("/userfriend", verifyToken, removeFriend);
router.put("/updateinfo/:id", verifyToken, updateUser);

export default router;

