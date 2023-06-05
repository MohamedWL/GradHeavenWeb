import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Company from "../models/Company.js";

//Register user

export const registerCompany = async (req, res) => {
    try {
        const {
            companyName,
            email,
            password,
            aboutUs,
            industry,
            location,
            picturePath,
            phoneNumber,
            ourVision,
            specialities,
            foundationDate
        } = req.body;
        const salt = await bcrypt.genSalt(); //encryption of our password
        const passwordHash = await bcrypt.hash(password, salt);
        const newCompany = new Company({
            companyName,
            email,
            password: passwordHash,
            aboutUs,
            industry,
            location,
            picturePath,
            phoneNumber,
            ourVision,
            specialities,
            foundationDate
        });
        const savedCompany = await newCompany.save();
        res.status(201).json(savedCompany);//status 201 as in created
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//login validation
export const loginComp = async (req, res) => {
    try {
        const { email, password } = req.body;
        const company = await Company.findOne({ email: email });
        if (!Company) return res.status(400).json({ msg: "User does not exist" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

        const token = jwt.sign({ id: company._id }, process.env.JWT_SECRET);
        delete company.password;
        res.status(200).json({ token, company });
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
}