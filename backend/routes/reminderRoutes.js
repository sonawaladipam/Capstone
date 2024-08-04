// routes/reminderRoutes.js
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Appointment = require('../models/Appoinment'); // Assuming this is your appointment model

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'expert.care99@gmail.com',
    pass: 'zgop aotj pdfp jbmv'
  }
});

// Endpoint to fetch upcoming appointments within the next 24 hours
router.get('/upcoming', async (req, res) => {
  try {
    const currentDate = new Date();
    const next24Hours = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);

    const appointments = await Appointment.find({
      AppointmentDate: {
        $gte: currentDate,
        $lte: next24Hours
      }
    });

    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).send('Error fetching appointments');
  }
});

// Endpoint to fetch future appointments
router.get('/future', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(23, 59, 59, 999); // End of today

    const futureAppointments = await Appointment.find({
      AppointmentDate: {
        $gt: today
      }
    });

    res.json(futureAppointments);
  } catch (error) {
    console.error('Error fetching future appointments:', error);
    res.status(500).send('Error fetching future appointments');
  }
});

// Endpoint to send email reminders
router.post('/send-reminder', async(req, res) => {
  const { email, subject, text, appointmentId } = req.body;

  const mailOptions = {
    from: '"Expert Care" <expert.care99@gmail.com>',
    to: email,
    subject: subject,
    text: text
  };
  
  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     console.error('Error sending email:', error);
  //     return res.status(500).send(error.toString());
  //   }
  //   console.log('Email sent:', info.response);
  //   res.status(200).send('Email sent: ' + info.response);
  // });
  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent');
    
    const updateResult = await Appointment.findByIdAndUpdate(
      appointmentId, 
      { ReminderStatus: true },
      { new: true }
    );
    if (updateResult) {
      console.log('Reminder status updated', updateResult);
      res.status(200).send('Email sent and status updated');
    } else {
      throw new Error('Failed to update reminder status');
    }
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send(error.toString());
  }
});

module.exports = router;
