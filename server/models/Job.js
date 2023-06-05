import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
    {
        companyId: {
            type: String,
        },
        JobTitle: {
            type: String,
            required: true,
            min: 5,
        },
        jobDescription: {
            type: String,
            required: true,
            min: 5,
        },
        aboutUs: {
            type: String,
            min: 2,
        },
        requirements: {
            type: String,
            min: 5,
        },
        otherSkills: {
            type: String,
            min: 5,
        },
        picturePath: {
            type: String,
            default: "",
        },
        expiringDate: {
            type: Date,
        }
    }, { timestamps: true }
);

const Job = mongoose.model("Job", JobSchema);
export default Job;