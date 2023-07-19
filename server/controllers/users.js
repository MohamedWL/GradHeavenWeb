
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

export const getAllUser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getUserByFullName = async (req, res) => {
    try {
        const { firstName, lastName } = req.query; // Assuming the first name and last name are passed in the request body
        
        const user = await User.findOne({ firstName, lastName });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const removeFriend = async (req, res) => {
    const { loggedUserIdentification, friendIdentification} = req.body;
    try {
        const user = await User.findById(loggedUserIdentification);
        const friend = await User.findById(friendIdentification);

        if (!user.friends.includes(friendIdentification) || !friend.friends.includes(loggedUserIdentification)) {
            res.status(400).json({ message: "User is not a friend" });
            return;
        }

        user.friends = user.friends.filter((friend) => friend !== friendIdentification);
        friend.friends = friend.friends.filter((friend) => friend !== loggedUserIdentification);

        await user.save();
        await friend.save();

        res.status(200).json({ message: "Friend removed successfully" });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
