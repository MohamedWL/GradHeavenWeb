import CoverLetter from "../models/CoverLetter.js";
import User from "../models/User.js";

//CREATE

export const createCoverLetter = async (req, res) => {
    try {
        const { userId, coverLetterContent } = req.body;
        const user = await User.findById(userId);
        const newCoverLetter = new CoverLetter({
            userId,
            coverLetterContent,
        })
        await newCoverLetter.save();
        const coverletter = await CoverLetter.find();
        res.status(201).json(coverletter);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

export const getUserCoverLetters = async (req, res) => {
    try {
        const { userId } = req.params;
        const coverletter = await CoverLetter.find(userId);
        res.status(200).json(coverletter);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}