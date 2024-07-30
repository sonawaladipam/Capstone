const mongoose = require('mongoose');

const revenueSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
});

module.exports = mongoose.model('Revenue', revenueSchema);
