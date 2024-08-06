// backend/routes/appointments.js
const express = require('express');
const router = express.Router();
const Appointment = require('../../backend/models/Appoinment');
const Customer = require('../models/customer');

// Utility function to check for overlapping appointments
const isOverlapping = (existingAppointment, newAppointmentStart, newAppointmentEnd) => {
  const existingStart = new Date(existingAppointment.AppointmentDate);
  const existingEnd = new Date(existingStart.getTime() + 30 * 60 * 1000); // Assuming 30 minutes duration

  return (newAppointmentStart < existingEnd && newAppointmentEnd > existingStart);
};

// Get all appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    console.log('All Appointments:', appointments); // debug log
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get today's appointments
router.get('/today', async (req, res) => {
  const startOfDay = new Date();

  //const localstartDate = startOfDay.toLocaleString('en-CA', { timeZone: 'America/Toronto' });
  console.log('startOfDay Date: ', startOfDay);
  //console.log('Timezome: ', localstartDate.getTimezoneOffset());
  startOfDay.setHours(0, 0, 0, 0);
  //startOfDay.setUTCHours(0, 0, 0, 0);
  const endOfDay = new Date();
  //const localendDate = endOfDay.toLocaleString('en-CA', { timeZone: 'America/Toronto' });
  endOfDay.setHours(23, 59, 59, 999);
  //endOfDay.setUTCHours(23, 59, 59, 999);

  const startOfDayUTC = new Date(startOfDay.toUTCString());
  const endOfDayUTC = new Date(endOfDay.toUTCString());

  console.log('UTC Start of Day: ', startOfDayUTC.toISOString());
  console.log('UTC End of Day: ', endOfDayUTC.toISOString());

  try {
    const todaysAppointments = await Appointment.find({
      AppointmentDate: {
         $gte: startOfDay,
         $lt: endOfDay
       
      }
    });
    console.log('Today\'s Appointments:', todaysAppointments); // debug log
    res.json(todaysAppointments);
  } catch (error) {
    console.error('Error fetching today\'s appointments:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get appointments by customer name
router.get('/by-customer-name', async (req, res) => {
  const { customerName } = req.query;
  try {
    const customer = await Customer.findOne({ name: customerName });
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const appointments = await Appointment.find({ customerId: customer._id });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Endpoint to add a new appointment
router.post('/', async (req, res) => {
  const { name, serviceID, appointmentDate, appointmentTime, reminderPreference } = req.body;

  // Log the incoming request body
  console.log('Received data:', req.body);

  // Ensure all required fields are present
  if (!serviceID || !appointmentDate || !appointmentTime || !name || !reminderPreference) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {

    // Combine AppointmentDate and AppointmentTime into a single Date object
    const appointmentDateTime = new Date(`${appointmentDate}T${appointmentTime}`);

    // Check if there is any existing appointment at the same date and time
    const existingAppointment = await Appointment.findOne({ AppointmentDate: appointmentDateTime });
    if (existingAppointment) {
      return res.status(400).json({ message: 'Appointment time conflicts with an existing appointment' });
    }

    // Find the last appointment to get the current highest AppointmentID
    const lastAppointment = await Appointment.findOne().sort({ AppointmentID: -1 });

    // Increment the AppointmentID by 1 from the last entry
    const newAppointmentID = lastAppointment ? lastAppointment.AppointmentID + 1 : 1;

    // Fetch customer email using customer name
    const customer = await Customer.findOne({ name });
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const newAppointment = new Appointment({
      AppointmentID: newAppointmentID,
      ServiceID: serviceID,
      AppointmentDate: appointmentDateTime,
      AppointmentTime: appointmentDateTime,
      Status: 'confirmed', // Set default value to false,
      CustomerID: customer.CustomerID, // Use the CustomerID from the customer document,
      name,
      ReminderStatus: false, // Set default value to false
      ReminderPreference: reminderPreference,
      Email: customer.email // Use the email from the customer document
    });

    const savedAppointment = await newAppointment.save();
    res.status(201).json(savedAppointment);
  } catch (error) {
    console.error('Error saving appointment:', error);
    res.status(500).json({ message: 'Error saving appointment', error: error.message });
  }
});

router.get('/future', async (req, res) => {
    try {
      const now = new Date();
      console.log('Current Date and Time: ', now.toISOString());
  
      const futureAppointments = await Appointment.find({
        AppointmentDate: {
          $gt: now // Find appointments where the date is greater than now
        }
      });
  
      console.log('Future Appointments:', futureAppointments); // debug log
      res.json(futureAppointments);
    } catch (error) {
      console.error('Error fetching future appointments:', error);
      res.status(500).json({ message: error.message });
    }
  });
module.exports = router;
