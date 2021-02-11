const jwt = require('jsonwebtoken');
import dotenv from "dotenv";
dotenv.config();

const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');

  // First validation
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  // Second validation
  const token = authHeader.split(' ')[1];
  if (!token || token === '') {
    req.isAuth = false;
    return next();
  }
  // Third validation
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    req.isAuth = false;
    return next();
  }
  // Fourth validation
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }

  req.isAuth = true;
  req.userId = decodedToken.userId;
  next();
};
