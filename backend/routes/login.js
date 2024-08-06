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
// const express = require('express');
// const session = require('express-session');
// const router = express.Router();
// const UserModel = require('../models/user.js');

// // Set up session management
// router.use(session({
//   secret: 'your-secret-key', // Replace with a secure secret key
//   resave: false,
//   saveUninitialized: false, // Do not save uninitialized sessions
//   cookie: { secure: false } // Set to true if using HTTPS
// }));

// // GET /login
// router.get('/', async (req, res) => {
//   try {
//     const { email, password } = req.query;

//     // Check if all required fields are present
//     if (!email || !password) {
//       return res.status(400).json({ error: 'Email and password are required' });
//     }

//     // Find the user by email in the database
//     const user = await UserModel.findOne({ email });

//     // Check if user exists and password matches
//     if (!user || user.password !== password) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     // Set user info in session
//     req.session.user = {
//       id: user._id,
//       email: user.email
      
//     };

//     // If credentials are valid, send a success response
//     res.status(200).json({ message: 'Login successful', user: req.session.user });
//     console.log('session.user.email', user.email);
//   } catch (error) {
//     console.error('Error logging in:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // GET /logout
// router.get('/logout', (req, res) => {
//   // Destroy the session
//   req.session.destroy(err => {
//     if (err) {
//       console.error('Error logging out:', err);
//       return res.status(500).json({ error: 'Internal server error' });
//     }

//     // Successfully logged out
//     res.status(200).json({ message: 'Logout successful' });
//   });
// });

// module.exports = router;
// const express = require('express');
// const session = require('express-session');
// const router = express.Router();
// const UserModel = require('../models/user.js');

// // Set up session management
// router.use(session({
//   secret: 'your-secret-key', // Replace with a secure secret key
//   resave: false,
//   saveUninitialized: false,
//   cookie: { secure: false } // Set to true if using HTTPS
// }));

// // GET /login
// router.get('/', async (req, res) => {
//   try {
//     const { email, password } = req.query;

//     if (!email || !password) {
//       return res.status(400).json({ error: 'Email and password are required' });
//     }

//     const user = await UserModel.findOne({ email });

//     if (!user || user.password !== password) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     req.session.user = {
//       id: user._id,
//       email: user.email
//     };

//     req.session.save(err => {
//       if (err) {
//         console.error('Error saving session:', err);
//       } else {
//         console.log('Session saved successfully');
//       }
//     });

//     console.log('Session after login:', req.session); // Log session info after setting

//     res.status(200).json({ message: 'Login successful', user: req.session.user });
//   } catch (error) {
//     console.error('Error logging in:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // GET /profile
// router.get('/profile', async (req, res) => {
//   try {
//     console.log('Session during profile request:', req.session); // Log session info

//     if (!req.session.user) {
//       return res.status(401).json({ error: 'Not authenticated' });
//     }

//     const user = await UserModel.findOne({ email: req.session.user.email });

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     res.status(200).json({ user });
//   } catch (error) {
//     console.error('Error fetching profile:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // GET /logout
// router.get('/logout', (req, res) => {
//   // Destroy the session
//   req.session.destroy(err => {
//     if (err) {
//       console.error('Error logging out:', err);
//       return res.status(500).json({ error: 'Internal server error' });
//     }

//     // Successfully logged out
//     res.status(200).json({ message: 'Logout successful' });
//   });
// });

// module.exports = router;
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const router = express.Router();
const UserModel = require('../models/user.js');

const app = express();

// Set up CORS
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));

// Set up session management with MongoStore
router.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: 'mongodb+srv://malharmehta7:Malhar3012002@cluster1.amivt4d.mongodb.net/userslogin' }),
  cookie: { secure: false }
}));

// Middleware to log session data
router.use((req, res, next) => {
  console.log('Session ID:', req.sessionID);
  console.log('Session data at the start of request:', req.session);
  next();
});

// GET /login
router.get('/', async (req, res) => {
  try {
    const { email, password } = req.query;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await UserModel.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    req.session.user = {
      id: user._id,
      email: user.email
    };

    req.session.save(err => {
      if (err) {
        console.error('Session save error:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.status(200).json({ message: 'Login successful', user: req.session.user });
    });

  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /profile
router.get('/profile', async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const user = await UserModel.findOne({ email: req.session.user.email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// router.get('/profile', async (req, res) => {
//   try {
//     // Check if the user session exists
//     if (!req.session.user || !req.session.user.email) {
//       return res.status(401).json({ error: 'Not authenticated' });
//     }

//     // Retrieve the email from the session
//     const email = req.session.user.email;

//     // Find the user in the database using the email
//     const user = await UserModel.findOne({ email });

//     // If the user is not found, return a 404 error
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Respond with the user data
//     res.status(200).json({ user });
//   } catch (error) {
//     console.error('Error fetching profile:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// GET /logout
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error logging out:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(200).json({ message: 'Logout successful' });
  });
});

module.exports = router;
