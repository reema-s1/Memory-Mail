const jwt = require('jsonwebtoken');

const generateToken = (userId, email) => {
  return jwt.sign({ userId, email }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

module.exports = generateToken;
