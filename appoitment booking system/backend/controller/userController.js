const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const createUser = async (req, res) => {
    try {
        const { username, email, password, phone, address, appointments } = req.body;

        if (!username || !email || !password || !phone || !address) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            phone,
            address,
            appointments: appointments || []
        });

        const token = jwt.sign(
            { id: newUser._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.cookie("token", token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === "production", // Secure in production
            sameSite: "Strict",
            maxAge: 3600000 // 1 hour
        });

        return res.status(201).json({
            success: true,
            message: 'User created successfully.',
            token,
            user: { id: newUser._id, username, email, phone, address } // Avoid returning password
        });

    } catch (err) {
        return res.status(500).json({ success: false, message: 'Server error.', error: err.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required.' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid email or password.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid email or password.' });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.cookie("token", token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === "production", // Secure in production
            sameSite: "Strict",
            maxAge: 3600000 // 1 hour
        });

        return res.status(200).json({
            success: true,
            message: 'Login successful.',
            token
        });

    } catch (err) {
        return res.status(500).json({ success: false, message: 'Server error.', error: err.message });
    }
};

const getCurrentUser = async (req, res) => {
    console.log(req.user);

    try {
        const userId = req.user.id; // Assuming user ID is available in req.user from middleware

        const user = await User.findById(userId).select("-password"); // Exclude password for security

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const updateUser = async (req, res) => {
    try {
        const { username, email, phone, address } = req.body;
        const user = await User.findByIdAndUpdate(req.user.id, { username, email, phone, address }, { new: true }).select("-password");

        if (!user) return res.status(404).json({ message: "User not found" });

        return res.status(200).json(user);
    } catch (error) {
        console.error("Update error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};


module.exports = { createUser, loginUser, getCurrentUser, updateUser };
