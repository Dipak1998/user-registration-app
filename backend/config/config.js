  module.exports = {
  port: process.env.PORT ,
  dbURI: process.env.MONGO_URI,
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,
  emailService: process.env.EMAIL_SERVICE,
  emailFrom: process.env.EMAIL_FROM ,
  secretKey: process.env.SECRET_KEY ,
};
