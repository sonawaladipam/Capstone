const express = require('express');
const Customer = require('../models/customer');
const router = express.Router();

// Route to add a new customer
router.post('/', async (req, res) => {
  try {
    const { name, phone, address, email } = req.body;

    // Validate the request body to ensure all required fields are present
    if (!name || !phone || !address || !email) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newCustomer = new Customer({ name, phone, address, email });
    await newCustomer.save();

    res.status(201).json(newCustomer);
  } catch (error) {
    console.error('Error adding customer:', error);
    res.status(500).json({ message: 'Error adding customer', error });
  }
});

// Route to get all customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to update a customer
router.put('/:id', async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedCustomer);
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});


module.exports = router;