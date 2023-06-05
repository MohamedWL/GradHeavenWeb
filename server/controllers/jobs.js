import Job from "../models/Job.js";
import Company from "../models/Company.js";

//CREATE

export const createJob = async (req, res) => {
    try {
        const { companyId, jobTitle, jobDescription, aboutUs, requirements, otherSkills, picturePath, expiringDate } = req.body;
        const company = await Company.findById(companyId);
        const newJob = new Job({
            companyId,
            jobTitle,
            jobDescription,
            aboutUs: company.aboutUs,
            requirements,
            otherSkills,
            picturePath,
            expiringDate,
        })
        await newJob.save();
        const job = await Job.find();
        res.status(201).json(job);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

export const getCompanyJobs = async (req, res) => {
    try {
        const { companyId } = req.params;
        const job = await Job.find(userId);
        res.status(200).json(job);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}