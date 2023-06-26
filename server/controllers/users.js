import User from "../models/User.js";
import Job from "../models/Job.js";

//READ
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );
        res.status(200).json(formattedFriends);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getUserJobs = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        const jobs = await Promise.all(
            user.jobs.map((id) => User.findById(id))
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
            ({ _id, companyId, jobTitle, jobDescription, location, aboutUs, requirements, otherSkills, advantages, picturePath, expiringDate, applicants, pay }) => {
                return { _id, companyId, jobTitle, jobDescription, location, aboutUs, requirements, otherSkills, advantages, picturePath, expiringDate, applicants, pay };
            }
        );
        req.status(200).json(formattedJobs);
    } catch (err) {
        req.status(404).json({ message: err.message });
    }
}
export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id);
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );

        res.status(200).json(formattedFriends);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

