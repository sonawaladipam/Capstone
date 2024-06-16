const express = require('express');
const router = express.Router();
const UserModel = require('../models/user.js');

// POST /login
router.get('/', async (req, res) => {
  try {
    const { email, password } = req.query;

    // Check if all required fields are present
    if (!email || !password) {
      return res.status(400).json({ error: 'email and password are required' });
    }

    // Find the user by name in the database
    const user = await UserModel.findOne({ email });

    // Check if user exists and password matches
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // If credentials are valid, send a success response
    res.status(200).json({ message: 'Login successful', user: user });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;