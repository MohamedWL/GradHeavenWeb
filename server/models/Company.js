import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema(
    {
        companyName: {
            type: String,
            required: true,
            min: 1,
            max: 50,
        },
        email: {
            type: String,
            required: true,
            min: 5,
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 5,
            max: 15,
        },
        website: {
            type: String,
            min: 5,
            max: 50,
        },
        aboutUs: {
            type: String,
            required: true,
            min: 2,
        },
        industry: {
            type: String,
            required: true,
            min: 5,
            max: 50,
        },
        location: {
            type: String,
            min: 2,
        },
        picturePath: {
            type: String,
            default: "",
        },
        phoneNumber: {
            type: String,
            min: 8,
        },
        ourVision: {
            type: String,
            min: 1,
        },
        specialities: {
            type: String,
        },
        foundationDate: {
            type: Date,
        }
    }, { timestamps: true }
);

const Company = mongoose.model("Company", CompanySchema);
export default Company;