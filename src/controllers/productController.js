const Product = require('../models/Item');
const User = require('../models/User');

// Fetch all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('creator', 'name'); // Adjust fields to populate as needed
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch products', error: error.message });
  }
};

// Fetch products by the current user
const getUserProducts = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming req.user contains authenticated user
    const userProducts = await Product.find({ creator: userId });
    res.status(200).json({ success: true, data: userProducts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch user products', error: error.message });
  }
};

// Fetch entrepreneur's story by product ID
const getEntrepreneurStory = async (req, res) => {
  try {
    const { productId } = req.params;

    // Find the product and populate its creator field
    const product = await Product.findById(productId).populate('creator', 'story name');
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Retrieve the story of the creator
    const entrepreneurStory = product.creator.story;
    if (!entrepreneurStory) {
      return res.status(404).json({ success: false, message: 'Story not available for this entrepreneur' });
    }

    res.status(200).json({ 
      success: true, 
      data: { 
        name: product.creator.name, 
        story: entrepreneurStory 
      } 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch story', error: error.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, description, price, image } = req.body;
    const creator = req.user._id; // Assuming the authenticated user is stored in req.user

    // Validate input
    if (!name || !description || !price || !image) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Create the product
    const newProduct = new Product({
      name,
      description,
      price,
      image, // Base64 image received from frontend
      creator,
    });

    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to add product', error: error.message });
  }
};

const removeProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id; // Assuming the authenticated user is stored in req.user

    // Find and delete the product
    const product = await Product.findOneAndDelete({ _id: productId, creator: userId });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found or not authorized' });
    }

    res.status(200).json({ success: true, message: 'Product removed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to remove product', error: error.message });
  }
};


module.exports = { getAllProducts, getUserProducts, getEntrepreneurStory, addProduct, removeProduct };
