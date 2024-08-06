const express = require('express');
const router = express.Router();
const UserModel = require('../models/user.js'); // Adjust path as necessary

// GET /profile
router.get('/', async (req, res) => {
  try {
    // Check if user is logged in
    if (!req.session.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    // Find the user by ID in the database
    const user = await UserModel.findById(req.session.user.email);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Send user data as response
    res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
