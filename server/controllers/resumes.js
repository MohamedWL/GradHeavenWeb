import Resume from "../models/Resume.js";
import User from "../models/User.js";

//CREATE

export const createResume = async (req, res) => {
    try {
        const { userId, firstName, lastName, email, phoneNumber, location, externalLinks, education, skills, domainSkills, experience, aboutMe, references } = req.body;
        const user = await User.findById(userId);
        const newResume = new Resume({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            location: user.location,
            externalLinks,
            education,
            skills,
            domainSkills,
            experience,
            aboutMe,
            references,
        })
        await newResume.save();
        const resume = await Resume.find();
        res.status(201).json(resume);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

export const getUserResumes = async (req, res) => {
    try {
        const { userId } = req.params;
        const resume = await Resume.find(userId);
        res.status(200).json(resume);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}