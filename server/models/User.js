import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        birthday: {
            type: Date,
            required: true,
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
        picturePath: {
            type: String,
            default: "",
        },
        phoneNumber: {
            type: String,
            min: 10,
            max: 20,
        },
        location: {
            type: String,
            required: true,
            min: 2,
        },
        industry: {
            type: String,
            required: true,
            min: 5,
        },
        desiredPay: Number,
        resumes: {
            type: Array,
            default: [],
        },
        jobs: {
            type: Array,
            default: [],
        }
    }, { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;

