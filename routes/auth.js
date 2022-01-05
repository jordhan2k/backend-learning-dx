const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const verifyToken = require('../middlewares/auth');

/**
 * @route GET api/v1/auth
 * @desc Check authentication status
 * @access Public
 */
router.get('/', verifyToken, async (req, res) => {
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

});

/**
 * @route POST api/v1/auth/register
 * @desc Register a new user
 * @access Public
 */
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // simple validation
    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: "Missing username or password"
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
})


/**
 * @route POST api/v1/auth/login
 * @des Login a user
 * @access Public
 */
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

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

})

module.exports = router;