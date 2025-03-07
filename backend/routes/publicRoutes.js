const express = require('express');
const { createUser, loginUser, authUsingGoogle } = require('../controllers/userController');

const router = express.Router();

// Public routes
router.post('/signup', createUser); // Route to register a new user
router.post('/login', loginUser);   // Route for user login
router.post('/google-login', authUsingGoogle);   // Route for user login


module.exports = router;
