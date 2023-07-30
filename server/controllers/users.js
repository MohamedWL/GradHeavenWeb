
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

/*
export const updateUser = async (req, res) => {
    const userId = req.params.id;
    const updatedData = req.body;

    try {
        // Find the user by their _id (userId) and update the data
        const user = await User.findByIdAndUpdate(userId, updatedData, {
            new: true, // Return the updated user data after the update
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Send the updated user data in the response
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error updating user information", error });
    }
};*/

export const updateUser = async (req, res) => {
    const userId = req.params.id;
    const updatedData = req.body;
    try {
        // Find the user by their _id (userId)
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log(updatedData);

        updatedData.fName !== undefined && updatedData.fName !== null && updatedData.fName !== "" ? user.firstName = updatedData.fName : user.firstName = user.firstName;
        updatedData.lName !== undefined && updatedData.lName !== null && updatedData.lName !== "" ? user.lastName = updatedData.lName : user.lastName = user.lastName;
        updatedData.pNumber !== undefined && updatedData.pNumber !== null && updatedData.pNumber !== "" ? user.phoneNumber = updatedData.pNumber : user.phoneNumber = user.phoneNumber;
        updatedData.loc !== undefined && updatedData.loc !== null && updatedData.loc !== "" ? user.location = updatedData.loc : user.location = user.location;
        updatedData.indus !== undefined && updatedData.indus !== null && updatedData.indus !== "" ? user.industry = updatedData.indus : user.industry = user.industry;
        updatedData.emailAdress !== undefined && updatedData.emailAdress !== null && updatedData.emailAdress !== "" ? user.email = updatedData.emailAdress : user.email = user.email;
        
        // Convert updatedData.pay to a number if it exists
        if (updatedData.pay !== undefined && updatedData.pay !== null && updatedData.pay !== "") {
            user.desiredPay = parseInt(updatedData.pay);
        } else {
            user.desiredPay = user.desiredPay; // Keep the previous value
        }

        // Convert updatedData.bday to a Date if it exists
        if (updatedData.bday !== undefined && updatedData.bday !== null && updatedData.bday !== "") {
            user.birthday = new Date(updatedData.bday);
        } else {
            user.birthday = user.birthday; // Keep the previous value
        }

        if (updatedData.picturePath !== undefined && updatedData.picturePath !== null) {
            user.picturePath = updatedData.picturePath;
        } else {
            user.picturePath = user.picturePath; // Keep the previous value
        }

        // Save the updated user data
        const updatedUser = await user.save();
        // Send the updated user data in the response
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Error updating user information", error });
    }
};





