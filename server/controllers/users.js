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

export const removeFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if (!user.friends.includes(friendId) || !friend.friends.includes(id)) {
            res.status(400).json({ message: "User is not a friend" });
            return;
        }

        user.friends = user.friends.filter((friend) => friend !== friendId);
        friend.friends = friend.friends.filter((friend) => friend !== id);

        await user.save();
        await friend.save();

        res.status(200).json({ message: "Friend removed successfully" });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getFriends = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate("friends");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ friends: user.friends });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const addFriend = async (req, res) => {
    try {
        const { id } = req.params;
        const { friendId } = req.body;

        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if (!user || !friend) {
            return res.status(404).json({ message: "User or friend not found." });
        }

        if (user.friends.includes(friendId) || friend.friends.includes(id)) {
            return res.status(400).json({ message: "User is already a friend." });
        }

        user.friends.push(friendId);
        friend.friends.push(id);

        await user.save();
        await friend.save();

        res.status(200).json({ message: "Friend added successfully.", friends: user.friends });
    } catch (error) {
        res.status(500).json({ message: "Failed to add friend.", error: error.message });
    }
};

//CHATGPT add the code that will add the selected user as a friend to a user

//CHATGPT add the code that will remove the selected user from a user's friend list

