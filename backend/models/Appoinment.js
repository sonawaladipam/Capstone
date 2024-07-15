const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  AppointmentID: { type: Number, required: true },
  ServiceID: { type: Number, required: true },
  AppointmentDate: { type: Date, required: true },
  AppointmentTime: { type: Date, required: true },
  Status: { type: String, required: true },
  CustomerID: { type: Number, required: true },
  name: { type: String, required: true } // Add this field for customer names
});

module.exports = mongoose.model('Appointment', appointmentSchema);
