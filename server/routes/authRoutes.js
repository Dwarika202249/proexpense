const express = require('express');
const router = express.Router();

// import controller functions
const {registerUser, loginUser, googleLogin, getMe} = require("../controllers/authController");

// @desc    Register/login new user using Google
// @route   POST /api/auth/google
router.post("/google", googleLogin);

// @route  POST /api/auth/register
// @desc Register new user
router.post("/register", registerUser);

// @route  POST /api/auth/login
// @desc Login user
router.post("/login", loginUser);


module.exports = router;