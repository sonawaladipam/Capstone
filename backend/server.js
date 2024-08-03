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
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/user'); // Assuming the user model is correctly defined
//const authRoutes = require('./routes/auth');
const register = require('./routes/register');
const login = require('./routes/login');
const customerRoutes = require('./routes/customers'); // Import customer routes
const appointmentRoutes = require('./routes/appoinments');
const nodemailer = require('nodemailer');
const http = require("http");
const MongoClient = require('mongodb').MongoClient;
const reminderRoutes = require('./routes/reminderRoutes');  

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail', // you can use any email service
  auth: {
    user: 'expert.care99@gmail.com',
    pass: 'zgop aotj pdfp jbmv'
  }
}); 


// MongoDB URI
// const mongoUri = "mongodb+srv://malharmehta7:Malhar3012002@cluster1.amivt4d.mongodb.net/userslogin";
const mongoUri = "mongodb+srv://malharmehta7:Malhar3012002@cluster1.amivt4d.mongodb.net/userslogin";
console.log('MongoDB URI:', mongoUri);

// Connect to MongoDB
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
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
app.use('/api/customers', customerRoutes);
// app.use('/api/login', login);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/reminders', reminderRoutes);

// app.post('/send-reminder', (req, res) => {
//   console.log('Received request to send email:', req.body); // Add this line

//   const { email, subject, text } = req.body;

//   const mailOptions = {
//     from: 'expert.care99@gmail.com',
//     to: 'malharmehta7@gmail.com',
//     subject: 'Test email for capstone',
//     text: 'This is the 1st test email of capstone'
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error('Error sending email:', error); // Add this line
//       return res.status(500).send(error.toString());
//     }
//     console.log('Email sent:', info.response); // Add this line
//     res.status(200).send('Email sent: ' + info.response);
//   });
// });


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
