// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   email: { type: String, unique: true },
//   password: String,
//   secretCode: String,
//   isEmailVerify: Boolean
//   // Add more fields for the user profile, like name, etc.
// });

// const User = mongoose.model('User', userSchema);

// module.exports = User;

/**
 * 
 * const mongoose = require('mongoose');

  const userProfileSchema = new mongoose.Schema({
    // Define fields for the user profile
    firstName: String,
    lastName: String,
    // Additional fields as needed
  });

  const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    // Embed the user profile schema
    profile: userProfileSchema,
  });

  const User = mongoose.model('User', userSchema);

  module.exports = User;

 */
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  isEmailVerified: Boolean
});

const User = mongoose.model('User', userSchema);

module.exports = User;
