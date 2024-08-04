const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  AppointmentID: { type: Number, required: true },
  ServiceID: { type: Number, required: true },
  AppointmentDate: { type: Date, required: true },
  AppointmentTime: { type: Date, required: true },
  Status: { type: String, required: true },
  CustomerID: { type: Number, required: true },
  name: { type: String, required: true }, 
  ReminderStatus: {type: Boolean, required: true},
  ReminderPreference: {type: String, required: true},
  Email: {type: String, required:true}
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
