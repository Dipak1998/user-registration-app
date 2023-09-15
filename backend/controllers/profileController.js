const UserProfile = require('../models/userProfileModel');

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const { userId } = req;
    console.log("req",req)

    // Find the user profile associated with the user ID
    const userProfile = await UserProfile.findOne({ userId });

    if (!userProfile) {
      return res.status(404).json({ message: 'User profile not found' });
    }

    res.status(200).json(userProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { userId } = req;
    const { firstName, lastName, interests } = req.body;

    // Find the user profile associated with the user ID
    let userProfile = await UserProfile.findOne({ userId });

    if (!userProfile) {
      // Create a new user profile if it doesn't exist
      console.log("user not available")
      userProfile = new UserProfile({ userId, firstName:firstName.trim(), lastName:lastName.trim(), interests: interests ||[] });
    }

    // Update user profile fields
    userProfile.firstName = firstName.trim();
    userProfile.lastName = lastName.trim();
    userProfile.interests = interests;

    await userProfile.save();

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete user profile
exports.deleteProfile = async (req, res) => {
  try {
    const { userId } = req;

    // Find and delete the user profile associated with the user ID
    const deletedProfile = await UserProfile.findOneAndDelete({ userId });

    if (!deletedProfile) {
      return res.status(404).json({ message: 'User profile not found' });
    }

    res.status(200).json({ message: 'Profile deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
