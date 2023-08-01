import express from "express";
import { getUserResumes, updateResume } from "../controllers/resumes.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/:id", verifyToken, getUserResumes);
router.put("/updateresume/:id", verifyToken, updateResume);

export default router;



