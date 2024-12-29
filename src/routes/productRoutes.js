const express = require('express');
const { getAllProducts, getUserProducts, getEntrepreneurStory, addProduct, removeProduct } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware'); // Middleware for authentication

const router = express.Router();

router.get('/all', getAllProducts); // Public or require admin-level auth
router.get('/user', protect, getUserProducts); // Private - requires auth
router.get('/story/:productId', getEntrepreneurStory); // Fetch entrepreneur's story by product ID
router.post('/add', protect, addProduct);
router.delete('/:productId', protect, removeProduct);

module.exports = router;
