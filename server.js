const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const tutorialsRoutes = require('./routes/tutorialsRoutes');
const mentorsRoutes = require('./routes/mentorsRoutes'); // Add this line

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', tutorialsRoutes);
app.use('/api', mentorsRoutes); // Add this line

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
