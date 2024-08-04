// const express = require('express');
// const router = express.Router();
// const UserModel = require('../models/user.js');

// // POST /login
// router.get('/', async (req, res) => {
//   try {
//     const { email, password } = req.query;

//     // Check if all required fields are present
//     if (!email || !password) {
//       return res.status(400).json({ error: 'email and password are required' });
//     }

//     // Find the user by name in the database
//     const user = await UserModel.findOne({ email });

//     // Check if user exists and password matches
//     if (!user || user.password !== password) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     // If credentials are valid, send a success response
//     res.status(200).json({ message: 'Login successful', user: user });
//   } catch (error) {
//     console.error('Error logging in:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// module.exports = router;
const express = require('express');
const session = require('express-session');
const router = express.Router();
const UserModel = require('../models/user.js');

// Set up session management
router.use(session({
  secret: 'your-secret-key', // Replace with a secure secret key
  resave: false,
  saveUninitialized: false, // Do not save uninitialized sessions
  cookie: { secure: false } // Set to true if using HTTPS
}));

// GET /login
router.get('/', async (req, res) => {
  try {
    const { email, password } = req.query;

    // Check if all required fields are present
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find the user by email in the database
    const user = await UserModel.findOne({ email });

    // Check if user exists and password matches
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Set user info in session
    req.session.user = {
      id: user._id,
      email: user.email
      
    };

    // If credentials are valid, send a success response
    res.status(200).json({ message: 'Login successful', user: req.session.user });
    console.log('session.user.email', user.email);
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /logout
router.get('/logout', (req, res) => {
  // Destroy the session
  req.session.destroy(err => {
    if (err) {
      console.error('Error logging out:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // Successfully logged out
    res.status(200).json({ message: 'Logout successful' });
  });
});

module.exports = router;
