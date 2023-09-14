const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register a new user
router.post('/register', authController.register);

// User Eamil Verification
router.get('/verify', authController.verifyUser);

// User login
router.post('/login', authController.login);



module.exports = router;
