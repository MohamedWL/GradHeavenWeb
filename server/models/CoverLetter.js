import mongoose from "mongoose";

const CoverLetterSchema = new mongoose.Schema(
    {
        userIdenditification: {
            type: String,
            required: true,
        },
        coverLetterContent: {
            type: String,
        }
    }, { timestamps: true }
);

const CoverLetter = mongoose.model("CoverLetter", CoverLetterSchema);
export default CoverLetter;