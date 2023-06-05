import mongoose from "mongoose";

const CoverLetterSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        coverLetterContent: {
            type: String,
            min: 10,
        }
    }, { timestamps: true }
);

const CoverLetter = mongoose.model("CoverLetter", CoverLetterSchema);
export default CoverLetter;