const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // Log the token being verified
  console.log('Authorization header:', authHeader);
  console.log('Extracted token:', token);

  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log('Token verification failed:', err.name, err.message);
      const errorMessage =
        err.name === 'TokenExpiredError'
          ? 'Token expired'
          : 'Invalid token';
      return res.status(403).json({ message: `Forbidden: ${errorMessage}` });
    }

    console.log('Authenticated user:', user);
    req.user = user; // Attach user details to the request object
    next();
  });
};

module.exports = authenticateToken;
