import express from "express";
import { getCompanyJobs } from "../controllers/jobs.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/:companyId/jobs", verifyToken, getCompanyJobs);

export default router;