const express = require('express');
const { registerUser, loginUser, getUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware'); // Middleware for authentication
const router = express.Router();

// Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUser);

module.exports = router;