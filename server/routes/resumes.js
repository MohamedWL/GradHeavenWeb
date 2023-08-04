import express from "express";
import { createResume, getUserResumes, updateResume } from "../controllers/resumes.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/:id", verifyToken, getUserResumes);
router.put("/updateresume/:id", verifyToken, updateResume);
router.post("/createresume/:id", verifyToken, createResume);

export default router;
