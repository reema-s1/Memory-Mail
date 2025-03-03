

const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming User model is in models folder

const router = express.Router();

// Login Endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Validate that email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Login attempt:', email, password);

    // Compare the entered password with the stored password (plain text comparison)
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET, // Replace with an environment variable in production
      { expiresIn: '7d' }
      
    );

    // Return the token and user information
    res.status(200).json({
      message: 'Login successful',
      token,
      user: { userId: user._id, email: user.email },
    });
    console.log("Generated token:", token);

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed', error });
  }
});

// Register Endpoint
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Validate that all required fields are provided
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Create a new user with the plain text password
    const newUser = new User({
      name,           // Include 'name'
      email,          // Include 'email'
      password,       // Include plain password
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Registration failed', error: err });
  }
});

module.exports = router;
