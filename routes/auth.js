const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller')
const verifyToken = require('../middlewares/auth');
const { check } = require('express-validator');

/**
 * @route GET api/v1/auth
 * @desc Check authentication status
 * @access Public
 */
router.get('/',
    verifyToken,
    authController.checkAuthStatus);

/**
 * @route POST api/v1/auth/register
 * @desc Register a new user
 * @access Public
 */
router.post('/register',
    [
        check("username")
            .isLength({ min: 6 })
            .withMessage("Username must be at leat 5 characters long")
            .trim()
        ,
        check("password")
            .isLength({ min: 6 })
            .withMessage("Password must be at leat 5 characters long")
            .trim()
    ],
    authController.register);

/**
 * @route POST api/v1/auth/login
 * @des Login a user
 * @access Public
 */
router.post('/login',
    [
        check("username")
            .isLength({ min: 6 })
            .withMessage("Username must be at leat 5 characters long")
        ,
        check("password")
            .isLength({ min: 6 })
            .withMessage("Password must be at leat 5 characters long")
    ]
    , authController.login);

module.exports = router;