import express from "express";
import { loginComp } from "../controllers/authComp.js";


const router = express.Router();

router.post("/login", loginComp);
export default router;
