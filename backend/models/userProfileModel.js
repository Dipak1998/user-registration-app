const mongoose = require('mongoose');
const User = require('./userModel')
const userProfileSchema = new mongoose.Schema({
  // Define fields for the user profile
  firstName: String,
  lastName: String,
  interests: [String],
  // Reference the User model
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile;
