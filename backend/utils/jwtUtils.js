const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || 'T3mpT0k3n'; // Store in env variable

// Generate JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '72h' }); // 72-hours expiry
};

// Verify JWT
const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

module.exports = { generateToken, verifyToken };
