const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/userModel');
const UserProfile = require('../models/userProfileModel');
const nodemailer = require('nodemailer');
const cryptoUtils = require('../utils/cryptoUtils');
const { createToken } = require('../utils/utils');
const baserUrl = 'http://127.0.0.1:3000/api/'
// Store the generated codes (in-memory, for demonstration)
const codeStore = {};

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  service: config.emailService,
  auth: {
    user: config.emailUser,
    pass: config.emailPass,
  },
});




// Register a new user with 2FA
exports.register = async (req, res) => {
  try {
    const { email, password, firstName, lastName , intrests} = req.body;

    if(email == '' || email == undefined || email == null){
      return  res.status(405).json({ message: 'Email is mandatory' });
    }
    if(password == '' || password == undefined || password == null){
      return res.status(405).json({ message: 'Password is mandatory' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ email, password: hashedPassword ,isEmailVerified:false});
    await user.save();
    const userProfile = new UserProfile({firstName:firstName || '', lastName:lastName || '', intrests:intrests ||[] ,user:user._id})
    await userProfile.save();
    // Generate security key/token
    const payload = {
      email: user.email,
      expiresIn: new Date().getTime() + (24*60*60*1000)
    }
    // Encrypt the verification code
    const encryptedToken = cryptoUtils.encryptCode(payload);
    console.log("encryptedToken", encryptedToken)
    // Send the encrypted verification code via email
    const mailOptions = {
      from: config.emailFrom,
      to: email,
      subject: 'Two-Factor Authentication Code',
      text: `Hi, Please verify your email account, to access the User Registration Application
             <a href=${baserUrl}auth/verify?security_token=${encryptedToken}>Please click here to verify <
      `,
    };
    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'Registration successful. Check your email for the verification code.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Verify the user using the verification code
exports.verifyUser = async (req, res) => {
  console.log("req", req.query)
    try {
      const { security_token } = req.query;
  
      if (!security_token) {
        return res.status(401).json({ message: 'Invalid verification token' });
      }
      // Check if the provided code matches the stored verification code
      const decryptSecurityToken = cryptoUtils.decryptCode(security_token)
      console.log("decryptSecurityToken",decryptSecurityToken)
      const { email, expiresIn } = decryptSecurityToken
      const currentDate = new Date().getTime();
      if(expiresIn < currentDate){
        res.status(200).json({ message: 'Time is expired for verification' });
      }
      // Mark the user's email account as verified
      await User.findOneAndUpdate({email:email},{ isEmailVerified: true });
      
      res.status(200).json({ message: 'Account verified successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };


exports.login = async (req, res) => {
  try {
    const { email, password} = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    console.log("user is ", user)
    if(!user.isEmailVerified){
      return res.status(405).json({ message: 'Please verify the email then try to login' });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const jwtPayload = {
      email:email
    }
    const token = createToken(jwtPayload);
    // const token = jwt.sign(jwtPayload, config.secretKey, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
