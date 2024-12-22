const express = require('express');
const { getAllItems, getItemById, addItemToCart, getCartItems, getSellerStory,removeItemFromCart } = require('../controllers/itemController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Fetch all items
router.get('/', getAllItems);



// Get items in the cart (requires authentication)
router.get('/cart', protect, getCartItems);

// Add an item to the cart (requires authentication)
router.post('/cart', protect, addItemToCart);
// Remove an item from the cart (requires authentication)
router.delete('/cart', protect, removeItemFromCart);


// View seller's story by seller ID
router.get('/story/:sellerId', getSellerStory);

// Fetch a single item by ID
router.get('/:id', getItemById);

module.exports = router;
