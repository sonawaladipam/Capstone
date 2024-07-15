// backend/routes/appointments.js
const express = require('express');
const router = express.Router();
const Appointment = require('../models/appoinment');

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
  console.log('Date: ', startOfDay);
  console.log('Timezome: ', startOfDay.getTimezoneOffset());
  //startOfDay.setHours(0, 0, 0, 0);
  startOfDay.setUTCHours(0, 0, 0, 0);
  const endOfDay = new Date();
  //endOfDay.setHours(23, 59, 59, 999);
  endOfDay.setUTCHours(23, 59, 59, 999);

  console.log('UTC Start of Day: ', startOfDay.toISOString());
  console.log('UTC End of Day: ', endOfDay.toISOString());

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

module.exports = router;
