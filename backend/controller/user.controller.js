import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register Controller
export const register = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        if (!fullname || !email || !password) {
            return res.status(400).json({
                message: "All fields are required.",
                success: false
            });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exists with this email",
                success: false
            });
        }

        const hashPassword = await bcrypt.hash(password, 10); // 10 is salt rounds
        await User.create({
            fullname,
            email,
            password: hashPassword
        });

        return res.status(201).json({
            message: "Account created successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Login Controller
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            });
        }

        // Generate JWT Token
        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        // Set the token as a cookie
        return res.status(200).cookie("token", token, {
            maxAge: 1 * 24 * 60 * 60 * 1000, // Cookie expires in 1 day
            httpOnly: true, // Makes cookie inaccessible to JavaScript
            sameSite: 'strict' // Restrict cookie to same-site requests
        }).json({
            message: `Welcome back ${user.fullname}`,
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email
            },
            success: true
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Something went wrong!",
            success: false
        });
    }
};

// Logout Controller
export const logout = async (req, res) => {
    try {
        // Clear the token by setting the cookie's maxAge to 0
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully",
            success: true
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Error during logout",
            success: false
        });
    }
};
