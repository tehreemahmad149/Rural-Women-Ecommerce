const express = require('express');
const { getItemById, addItemToCart, getCartItems, removeItemFromCart } = require('../controllers/itemController');
const { protect } = require('../middleware/authMiddleware'); // Middleware for authentication

const router = express.Router();


// Get items in the cart (requires authentication)
router.get('/cart', protect, getCartItems);

// Add an item to the cart (requires authentication)
router.post('/cart', protect, addItemToCart);
// Remove an item from the cart (requires authentication)
router.delete('/cart', protect, removeItemFromCart);

// Fetch a single item by ID
router.get('/:id', getItemById);

module.exports = router;