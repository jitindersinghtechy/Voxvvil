const jwt = require('jsonwebtoken');

// Middleware function to verify JWT token
const verifyToken = (req, res, next) => {
  console.log(req.header('Authorization'))
  // Get the token from the request headers
  const token = req.header('Authorization');
  // Check if the token is present
  if (!token) {
    return res.status(401).json({ message: 'You have no Access' });
  }

  try {
    // Verify the token using your secret key (this should match the key used for signing)
    const decoded = jwt.verify(token, process.env.JWT_PRIVATEKEY);
    // Add the decoded user data to the request object so that it can be accessed by subsequent middleware or route handlers
    req.user = decoded;
    // Call the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ message: 'You have no Access' });
  }
};

module.exports = verifyToken;
