import express from "express";
import { getCompanyJobs, getJobs } from "../controllers/jobs.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/:companyId/jobs", verifyToken, getCompanyJobs);
router.get("/joblist", getJobs);

export default router;