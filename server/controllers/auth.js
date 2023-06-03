import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

//Register user

export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            phoneNumber,
            location,
            industry,
            resumes,
            applications
        } = req.body;
        const salt = await bcrypt.genSalt(); //encryption of our password
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            phoneNumber,
            location,
            industry,
            resumes,
            applications
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);//status 201 as in created
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//login validation
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!User) return res.status(400).json({ msg: "User does not exist" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
}