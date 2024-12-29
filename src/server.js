const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes'); // Import the routes file
const tutorialsRoutes = require('./routes/tutorialsRoutes');
const mentorsRoutes = require('./routes/mentorsRoutes'); // Add this line
const { activeTokens } = require("./controllers/userController");


const app = express();

activeTokens.clear();

// Middleware to parse JSON request bodies
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' })); // Increase the size limit to 50MB
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));  // For URL encoded data

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:nustcloud@web-project.wxpjq.mongodb.net/?retryWrites=true&w=majority&appName=web-project')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

  

// Mount the product routes under /api/products
app.use('/api/products', productRoutes);
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/items', require('./routes/itemRoutes'));
app.use('/api', tutorialsRoutes);
app.use('/api', mentorsRoutes);

// Define a port for the backend server (usually 5000 for development)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
