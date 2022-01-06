const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validationResult } = require('express-validator');

const checkAuthStatus = async (req, res) => {
    const userId = req.userId;
    try {
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        return res.json({
            success: true,
            user
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }

}

const register = async (req, res) => {
    const { username, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }

    try {
        const user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({
                success: false,
                message: "Username has already been taken"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 11);
        const newUser = new User({
            username,
            password: hashedPassword
        });

        await newUser.save();

        const accessToken = jwt.sign({
            userId: newUser._id
        },
            process.env.ACCESS_TOKEN_SECRET);

        return res.json({
            success: true,
            message: "Successfully registered",
            accessToken
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const accessToken = jwt.sign({
            userId: user._id
        },
            process.env.ACCESS_TOKEN_SECRET);


        return res.json({
            success: true,
            message: "Successfully login",
            accessToken
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

exports.checkAuthStatus = checkAuthStatus;
exports.register = register;
exports.login = login;