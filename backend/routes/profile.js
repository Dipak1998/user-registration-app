const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { verifyToken } = require('../utils/utils');

// Get user profile
router.get('/',verifyToken, profileController.getProfile);

// Update user profile
router.put('/',verifyToken, profileController.updateProfile);

// Delete user profile
router.delete('/',verifyToken, profileController.deleteProfile);

module.exports = router;
