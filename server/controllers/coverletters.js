import CoverLetter from "../models/CoverLetter.js";
import User from "../models/User.js";

//CREATE

export const createCoverLetter = async (req, res) => {
    const userId = req.params.id;
    const { coverLetterContent } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const newCoverLetter = new CoverLetter({
            userIdenditification: userId,
            coverLetterContent: coverLetterContent, // Use coverLetterContent here
        });
        const savedCoverLetter = await newCoverLetter.save();
        res.status(201).json(savedCoverLetter);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}


export const getUserCoverLetters = async (req, res) => {
    const { id: userId } = req.params;
    try {
        const coverletter = await CoverLetter.findOne({ userIdenditification: userId });
        if (coverletter) {
            // If a cover letter is found, return it in the response
            res.status(200).json(coverletter);
        } else {
            // If no cover letter is found, return null or a flag value along with a message
            res.status(404).json({ coverletter: null });
        }
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}


export const updateCoverLetter = async (req, res) => {
    const userId = req.params.id;
    const updatedData = req.body;
    console.log(updatedData);
    try {
      // Find the user by their _id (userId)
      const coverletter = await CoverLetter.findOne({ userIdenditification: userId });
      if (!coverletter) {
        return res.status(404).json({ message: "User not found" });
      }
      console.log(coverletter);
      // Update the resume fields if the data is not empty
      coverletter.coverLetterContent = updatedData.covletsend !== "" || null ? updatedData.covletsend : coverletter.coverLetterContent;
      console.log(coverletter);
      // Save the updated user data
      const updatedCoverLetter = await coverletter.save();
      // Send the updated user data in the response
      res.status(200).json(updatedCoverLetter);
    } catch (error) {
      res.status(500).json({ message: "Error updating user information", error });
    }
  };