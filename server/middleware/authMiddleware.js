
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  // Extract the token from the Authorization header
  const authHeader = req.header('Authorization');
  
  // Check if token is present
  if (!authHeader) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Extract token from 'Bearer <token>' format
  const token = authHeader.split(' ')[1];
  
  // Check if token is present
  if (!token) {
    return res.status(401).json({ message: 'Token not found in authorization header' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach user information to request object
    req.user = decoded;
    
    next();
  } catch (err) {
    console.error(`Token verification failed: ${err.message}`); // Log error details
    res.status(401).json({ message: 'Token is not valid' });
  }
};
