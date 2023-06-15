import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phoneNumber: String,
        location: String,
        externalLinks: {
            type: String,
        },
        education: {
            type: String,
            required: true,
            min: 5,
        },
        skills: {
            type: String,
            required: true,
            min: 2,
        },
        domainSkills: {
            type: String,
            required: true,
            min: 5,
        },
        experience: {
            type: String,
            required: true,
            min: 10,
        },
        aboutMe: {
            type: String,
            required: true,
            min: 2,
        },
        references: {
            type: String,
            min: 5,
        },
        userPicturePath: {
            type: String,
            default: "",
        }
    }, { timestamps: true }
);

const Resume = mongoose.model("Resume", ResumeSchema);
export default Resume;