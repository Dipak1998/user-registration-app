const nodemailer = require('nodemailer');
const config = require('../config/config');

const transporter = nodemailer.createTransport({
  service: config.emailService,
  auth: {
    user: config.emailUser,
    pass: config.emailPass,
  },
});

const sendEmail = (to, subject, text, callback) => {
  const mailOptions = {
    from: config.emailFrom,
    to: to,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, callback);
};

module.exports = sendEmail;
