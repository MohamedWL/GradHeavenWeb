import express from 'express';
import bodyParser from 'body-parser';
import mongoose, { trusted } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from 'url';
import authRoutes from "./routes/auth.js";
import authCompRoutes from "./routes/authcomp.js";
import userRoutes from "./routes/users.js ";
import resumeRoutes from "./routes/resumes.js";
import companyRoutes from "./routes/companies.js";
import jobRoutes from "./routes/jobs.js";
import coverLetterRoutes from "./routes/coverletters.js";
import { register } from "./controllers/auth.js";
import { registerCompany } from './controllers/authComp.js';
import { createResume } from "./controllers/resumes.js"
import { createJob } from './controllers/jobs.js';
import { createCoverLetter } from "./controllers/coverletters.js"
import { verifyToken } from './middleware/auth.js';

//Configurations

const __filename = fileURLToPath(import.meta.url); //we can grab the file url when we use the module
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets'))); //set the directory of where we keep our images


//FILE STORAGE
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

//ROUTES WITH FILES 
app.post("/auth/register", upload.single("picture"), register); //middleware before running the endpoint, register controller
app.post("/authcomp/registerCompany", upload.single("picture"), registerCompany); //mandatory?

//ROUTES
app.use("/auth", authRoutes);
app.use("/authcomp", authCompRoutes);
app.use("/users", userRoutes);
app.use("/companies", companyRoutes);
app.use("/resumes", resumeRoutes);
app.post("/resumes", verifyToken, createResume)
app.use("/coverletters", coverLetterRoutes);
app.post("/coverletters", verifyToken, createCoverLetter)
app.use("/jobs", jobRoutes);
app.post("/jobs", verifyToken, createJob)

//MONGOOSE

const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server port: ${PORT}`));
}).catch((error) => console.log(`${error} did not connect`));











