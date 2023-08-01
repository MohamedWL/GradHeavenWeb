import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema(
    {
        userIdenditification: {
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
        linkedInLink: {
            type: String,
        },
        portfolioLink: {
            type: String,
        },
        highestDegree: {
            type: String,
            required: true,
        },
        fieldOfStudy: {
            type: String,
            required: true,
        },
        educationEstablishment: {
            type: String,
            required: true,
        },
        hasGraduated: {
            type: Boolean,
        },
        graduationDate: {
            type: Date,
        },
        skills: {
            type: String,
            required: true,
        },
        domainSkills: {
            type: String,
            required: true,
        },
        experience: {
            type: String,
            required: true,
        },
        firstReference: {
            type: String,
        },
        secondReference: {
            type: String,
        },
        userPicturePath: {
            type: String,
            default: "",
        }
    }, { timestamps: true }
);

const Resume = mongoose.model("Resume", ResumeSchema);
export default Resume;