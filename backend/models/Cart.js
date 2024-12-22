const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item', // Reference to the Item model
  }],
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
