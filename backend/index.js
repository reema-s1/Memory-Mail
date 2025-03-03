// // run `node index.js` in the terminal

// console.log(`Hello Node.js v${process.versions.node}!`);

const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const capsuleRoutes = require('./routes/capsules');

const app = express();
mongoose.connect('mongodb://localhost:27017/memory-mail', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

// Routes
app.use('/api', authRoutes); // Login/Register endpoints
app.use('/api/capsules', capsuleRoutes); // Capsule endpoints

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
