import express from "express";
import {
    getUser,
    getUserJobs,
    //getUserResume,
    addRemoveSavedJobs,
    getUserFriends,
    addRemoveFriend,
    //addRemoveResume,
} from "../controllers/users.js";

import { verifyToken } from "../middleware/auth.js";

const router = express.Router();



//READ
router.get("/:id", verifyToken, getUser);
router.get("/:id/jobs", verifyToken, getUserJobs);
//router.get("/:id/resumes", verifyToken, getUserResumes);

//UPDATE
router.patch("/:id/jobId", verifyToken, addRemoveSavedJobs);
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);
//router.patch("/:id/resumeId", verifyToken, addRemoveResumes);
router.get("/:id/friends", verifyToken, getUserFriends);

//Jobs listed in user page

export default router;

