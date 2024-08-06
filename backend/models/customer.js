//backend/models/customer.js

const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  CustomerID: { 
    type: Number, 
    required: true 
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
  },
});

//const Customer = mongoose.model('Customer', customerSchema);
const Customer = mongoose.model('customers', customerSchema);

module.exports = Customer;
