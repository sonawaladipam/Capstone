// // const express = require('express');
// // const mongoose = require('mongoose');
// // const bcrypt = require('bcryptjs');
// // const cors = require('cors');
// // const User = require('./models/user.js'); 
// // const app = express();
// // const port = process.env.PORT || 3000;

// // app.use(cors());
// // app.use(express.json());

// // // MongoDB URI
// // const mongoUri = "mongodb+srv://malharmehta7:Malhar3012002@cluster1.amivt4d.mongodb.net/userslogin";
// // console.log('MongoDB URI:', mongoUri);

// // // Connect to MongoDB
// // mongoose.connect(mongoUri)
// //   .then(() => console.log('MongoDB connected'))
// //   .catch(err => {
// //     console.error('MongoDB connection error:', err);
// //     process.exit(1); // Exit the process with failure
// //   });

// // // Middleware to log requests
// // app.use((req, res, next) => {
// //   console.log(`${req.method} request for '${req.url}'`);
// //   next();
// // });

// // // Route to handle user signup
// // app.post('/api/signup', async (req, res) => {
// //   try {
// //     const { username, email, password } = req.body;

// //     // Check if the email is already registered
// //     const existingUser = await User.findOne({ email });
// //     if (existingUser) {
// //       return res.status(400).json({ message: 'Email already exists' });
// //     }

// //     // Hash the password


// //     // Create a new user document
// //     const newUser = new User({ username, email, password});
// //     await newUser.save();

// //     res.status(201).json({ message: 'User created successfully' });
// //   } catch (error) {
// //     console.error('Error during user signup:', error);
// //     res.status(500).json({ message: 'Internal Server Error' });
// //   }
// // });


// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const User = require('./models/user.js'); 
// const authRoutes = require('./routes/auth');

// const app = express();
// const port = process.env.PORT || 3000;

// app.use(cors());
// app.use(express.json());

// // MongoDB URI
// const mongoUri = "mongodb+srv://malharmehta7:Malhar3012002@cluster1.amivt4d.mongodb.net/userslogin";
// console.log('MongoDB URI:', mongoUri);

// // Connect to MongoDB
// mongoose.connect(mongoUri)
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => {
//     console.error('MongoDB connection error:', err);
//     process.exit(1); // Exit the process with failure
//   });

// // Middleware to log requests
// app.use((req, res, next) => {
//   console.log(`${req.method} request for ${req.url}`);
//   next();
// });

// // Routes
// app.use(authRoutes);

// app.listen(port, () => {
//   console.log('Server running on port ${port}');
// });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/user'); // Assuming the user model is correctly defined
//const authRoutes = require('./routes/auth');
const register = require('./routes/register');
const login = require('./routes/login')
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// MongoDB URI
// const mongoUri = "mongodb+srv://malharmehta7:Malhar3012002@cluster1.amivt4d.mongodb.net/userslogin";
const mongoUri = "mongodb+srv://malharmehta7:Malhar3012002@cluster1.amivt4d.mongodb.net/userslogin";
console.log('MongoDB URI:', mongoUri);

// Connect to MongoDB
mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process with failure
  });

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});

// Routes
// app.use('/api', authRoutes);
app.use('/api/register', require('./routes/register'));
app.use('/api/login', require('./routes/login'));
// app.use('/api/login', login);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
