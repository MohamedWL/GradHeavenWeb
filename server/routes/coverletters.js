import express from "express";
import { getUserCoverLetters } from "../controllers/coverletters.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/:userId/coverletters", verifyToken, getUserCoverLetters);

export default router;