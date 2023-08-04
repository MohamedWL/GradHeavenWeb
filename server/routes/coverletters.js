import express from "express";
import { getUserCoverLetters, createCoverLetter, updateCoverLetter} from "../controllers/coverletters.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/getcoverletter/:id", verifyToken, getUserCoverLetters);
router.post("/createcoverletter/:id", verifyToken, createCoverLetter);
router.put("/updatecoverletter/:id", verifyToken, updateCoverLetter);
export default router;