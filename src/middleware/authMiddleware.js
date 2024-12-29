const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_SECRET='46e2c3f7bd1e57c68786ab7d60cf70e7f63d4e0b6c3b98d1fdc9e5f7162e2c7d';
const { activeTokens } = require("../controllers/userController");

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Check if the token is in the activeTokens set
      if (!activeTokens.has(token)) {
        return res.status(401).json({ message: 'Token invalid or expired' });
      }

      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };