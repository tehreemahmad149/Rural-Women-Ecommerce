const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true }, // URL or base64 image string
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // References the entrepreneur user
  },
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);