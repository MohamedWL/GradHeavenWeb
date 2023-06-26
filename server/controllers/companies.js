import Company from "../models/Company.js";

//READ
export const getCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const company = await Company.findById(id);
        req.status(200).json(company);
    } catch (err) {
        req.status(404).json({ message: err.message });
    }
}

export const getCompanyJobs = async (req, res) => {
    try {
        const { id } = req.params;
        const company = await Company.findById(id);

        const jobs = await Promise.all(
            company.jobs.map((id) => Company.findById(id))
        );

        const formattedJobs = jobs.map(
            ({ _id, companyId, jobTitle, jobDescription, location, aboutUs, requirements, otherSkills, advantages, picturePath, expiringDate, applicants, pay }) => {
                return { _id, companyId, jobTitle, jobDescription, location, aboutUs, requirements, otherSkills, advantages, picturePath, expiringDate, applicants, pay };
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


export const addRemoveCompanyJobs = async (req, res) => {
    try {
        const { id, jobId } = req.params;
        const company = Company.findById(id);
        const job = await Company.findById(jobId);
        if (company.jobs.includes(jobId)) {
            company.jobs = company.jobs.filter((id) => id !== jobId);
            job.jobs = job.jobs.filter((id) => id !== id); //we check if the id correspond and we remove them if so
        } else {
            company.jobs.push(jobId);
            job.jobs.push(id);
        }
        await company.save();
        await job.save();

        const jobs = await Promise.all(
            company.jobs.map((id) => Company.findById(id))
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












