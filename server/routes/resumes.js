import express from "express";
import { getUserResumes } from "../controllers/resumes.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/:userId/resumes", verifyToken, getUserResumes);

export default router;

















