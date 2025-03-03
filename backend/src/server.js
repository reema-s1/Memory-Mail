const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const capsuleRoutes = require('./routes/capsules');
const { checkCapsules } = require('./utils/capsuleChecker');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', authRoutes);
app.use('/api/capsules', capsuleRoutes);

// Schedule daily capsule check at midnight
cron.schedule('0 0 * * *', async () => {
  try {
    await checkCapsules();
    console.log('Daily capsule check completed');
  } catch (error) {
    console.error('Error in daily capsule check:', error);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});