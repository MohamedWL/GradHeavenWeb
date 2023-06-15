import User from "../models/User.js";

//READ
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        req.status(200).json(user);
    } catch (err) {
        req.status(404).json({ message: err.message });
    }
}

export const getUserJobs = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        const jobs = await Promise.all(
            user.jobs.map((id) => User.findById(id))
        );

        const formattedJobs = jobs.map(
            ({ _id, companyId, jobTitle, jobDescription, location, aboutUs, requirements, otherSkills, advantages, picturePath, expiringDate, applicants }) => {
                return { _id, companyId, jobTitle, jobDescription, location, aboutUs, requirements, otherSkills, advantages, picturePath, expiringDate, applicants };
            }
        );
        req.status(200).json(formattedJobs);
    } catch (err) {
        req.status(404).json({ message: err.message });
    }
}

/*export const getUserResumes = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        const resumes = await Promise.all(
            user.resumes.map((id) => User.findById(id))
        );

        const formattedResumes = resumes.map(
            ({ _id, userId, aboutMe, externalLinks, education, skills, domainSkills, experience, references }) => {
                return { _id, userId, aboutMe, externalLinks, education, skills, domainSkills, experience, references };
            }
        );
        req.status(200).json(formattedResumes);
    } catch (err) {
        req.status(404).json({ message: err.message });
    }
}*/

//update


export const addRemoveSavedJobs = async (req, res) => {
    try {
        const { id, jobId } = req.params;
        const user = User.findById(id);
        const job = await User.findById(jobId);
        if (user.jobs.includes(jobId)) {
            user.jobs = user.jobs.filter((id) => id !== jobId);
            job.jobs = job.jobs.filter((id) => id !== id); //we check if the id correspond and we remove them if so
        } else {
            user.jobs.push(jobId);
            job.jobs.push(id);
        }
        await user.save();
        await job.save();

        const jobs = await Promise.all(
            user.jobs.map((id) => User.findById(id))
        );
        const formattedJobs = jobs.map(
            ({ _id, companyId, jobTitle, jobDescription, location, aboutUs, requirements, otherSkills, advantages, picturePath, expiringDate, applicants }) => {
                return { _id, companyId, jobTitle, jobDescription, location, aboutUs, requirements, otherSkills, advantages, picturePath, expiringDate, applicants };
            }
        );
        req.status(200).json(formattedJobs);
    } catch (err) {
        req.status(404).json({ message: err.message });
    }
}

/*export const addRemoveResumes = async (req, res) => {
    try {
        const { id, resumeId } = req.params;
        const user = User.findById(id);
        const resume = await User.findById(resumeId);
        if (user.resumes.includes(resumeId)) {
            user.resumes = user.resumes.filter((id) => id !== resumeId);
            resume.resumes = resume.resumes.filter((id) => id !== id); //we check if the id correspond and we remove them if so
        } else {
            user.resumes.push(resumeId);
            resume.resumes.push(id);
        }
        await user.save();
        await resume.save();

        const resumes = await Promise.all(
            user.resumes.map((id) => User.findById(id))
        );

        const formattedResumes = resumes.map(
            ({ _id, userId, aboutMe, externalLinks, education, skills, domainSkills, experience, references }) => {
                return { _id, userId, aboutMe, externalLinks, education, skills, domainSkills, experience, references };
            }
        );
        req.status(200).json(formattedResumes);
    } catch (err) {
        req.status(404).json({ message: err.message });
    }
}*/












