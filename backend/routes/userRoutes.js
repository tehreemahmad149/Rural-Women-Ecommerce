const express = require('express');
const { registerUser, loginUser, getUser } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

// Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUser);

module.exports = router;
