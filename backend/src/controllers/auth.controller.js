const userModel = require('../models/user.model')
const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function registerController(req,res) {

    try {
        const { email, username, password } = req.body;

        // 1. Check required fields
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
                errors: {
                    ...(!username && { username: "Username is required" }),
                    ...(!email && { email: "Email is required" }),
                    ...(!password && { password: "Password is required" })
                }
            });
        }

        // 2. Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email.trim())) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format",
                errors: {
                    email: "Please enter a valid email"
                }
            });
        }

        // 3. Validate password length
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password is too short",
                errors: {
                    password: "Password must be at least 8 characters"
                }
            });
        }

        // 4. Check whether username or email already exists
        const normalizedEmail = email.trim().toLowerCase();
        const normalizedUsername = username.trim();

        const existingUser = await userModel.findOne({
            $or: [
                { username: normalizedUsername },
                { email: normalizedEmail }
            ]
        });

        if (existingUser) {
            if (existingUser.email === normalizedEmail) {
                return res.status(409).json({
                    success: false,
                    message: "Email already exists",
                    errors: {
                        email: "This email is already registered"
                    }
                });
            }

            return res.status(409).json({
                success: false,
                message: "Username already exists",
                errors: {
                    username: "This username is already taken"
                }
            });
        }

        // 5. Hash password
        const hash = await bcrypt.hash(password, 10);

        // 6. Create user
        const user = await userModel.create({
            username: normalizedUsername,
            email: normalizedEmail,
            password: hash
        });

        // 7. Generate JWT
        const token = jwt.sign(
            {
                id: user._id,
                username: user.username
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        // 8. Set cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        });

        // 9. Send success response
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {

        // 10. Handle duplicate database values
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern || {})[0];

            return res.status(409).json({
                success: false,
                message: `${field || "Field"} already exists`,
                errors: {
                    [field || "general"]: `${field || "Field"} is already registered`
                }
            });
        }

        // 11. Handle Mongoose validation errors
        if (error.name === "ValidationError") {
            const errors = {};

            for (const field in error.errors) {
                errors[field] = error.errors[field].message;
            }

            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors
            });
        }

        // 12. Handle unexpected errors
        console.error("Registration error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }

}


module.exports = {
    registerController
}