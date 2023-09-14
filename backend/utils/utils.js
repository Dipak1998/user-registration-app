const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.createToken =(userData)=>{
  // Define token expiration (e.g., 1 hour)
  const expiresIn = 86400;

  // Create and sign the token with user data and secret key
  const token = jwt.sign(userData, config.secretKey, { expiresIn:expiresIn, algorithm: 'HS256'  });

  return token;
}

// exports.verifyToken = (req, res, next) => {
//   let token = req.headers.authorization;
//   console.log("token", token)
//   if (!token) {
//     return res.status(401).json({ message: 'No token provided' });
//   }

//   jwt.verify(token, config.secretKey, (err, decoded) => {
//     if (err) {
//       console.log("error while try to verify token", err, decoded)
//       return res.status(401).json({ message: 'Invalid token' });
//     }

//     req.user = decoded;
//     next();
//   });

  
// };
exports.verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  console.log("token", token)
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
  jwt.verify(token, config.secretKey, (err, decoded) => {
    if (err) {
      console.log("error ", err, "config.secret",config.secretKey)
      return res.status(401).send({
        message: "Unauthorized!",
        error:err
      });
    }
    req.userId = decoded.id;
    next();
  });
};