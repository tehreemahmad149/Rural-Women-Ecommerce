const Item = require('../models/Item');
const User = require('../models/User');
const Cart = require('../models/Cart');


// Get a single item by ID
const getItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.findById(id).populate('creator', 'name');
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add item to cart
const addItemToCart = async (req, res) => {
  const { itemId } = req.body;
  const userId = req.user.id;

  try {
    // Find the item by ID
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Find the user's cart or create a new one if it doesn't exist
    let cart = await Cart.findOne({ userId });
    
    if (!cart) {
      // Create a new cart if it doesn't exist
      cart = new Cart({
        userId,
        items: [itemId],
      });
    } else{
        cart.items.push(itemId);
    }

    // Save the cart
    await cart.save();
    
    res.status(200).json({ message: 'Item added to cart', cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get items in the user's cart
const getCartItems = async (req, res) => {
  try {
    // Get the logged-in user's ID from the token
    const userId = req.user.id; // Ensure you're extracting user ID from JWT
    
    // Find the cart associated with the user
    const cart = await Cart.findOne({ userId }).populate('items');
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Return the items in the cart
    const totalPrice = cart.items.reduce((total, item) => total + item.price, 0);

    // Return the items in the cart and the total price
    res.json({ items: cart.items, totalPrice });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeItemFromCart = async (req, res) => {
    const { itemId } = req.body;
    const userId = req.user.id;
  
    try {
      // Find the user's cart
      let cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
      const itemIndex = cart.items.findIndex((id) => id.toString() === itemId);// Find the index of the item to remove
      if (itemIndex === -1) {
        return res.status(404).json({ message: 'Item not found in cart' });
      }
      cart.items.splice(itemIndex, 1);// Remove the item at the found index (only one instance)
  
      // Save the updated cart
      await cart.save();
  
      res.status(200).json({ message: 'Item removed from cart', cart });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

module.exports = { getItemById, addItemToCart, getCartItems,removeItemFromCart, };