import express from "express";
import {
    getCompany,
    getCompanyJobs,
    addRemoveCompanyJobs,
} from "../controllers/companies.js";

import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//READ
router.get("/:id", verifyToken, getCompany);
router.get("/:id/companies", verifyToken, getCompanyJobs);


//UPDATE
router.patch("/:id/jobId", verifyToken, addRemoveCompanyJobs);


export default router;
