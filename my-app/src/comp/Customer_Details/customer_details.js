import React, { useState } from 'react';
import Header from '../header/header';
import Footer from '../Footer/footer';
import './customer_details.css';

const CustomerDetails = () => {
  const initialCustomers = [
    { name: "Arha Sonawala", phone: "123-456-7890", address: "123 Main St, City, Country" },
    { name: "Dipam Sonawala", phone: "123-456-7891", address: "124 Main St, City, Country" },
    { name: "Malhar Mehta", phone: "123-456-7892", address: "125 Main St, City, Country" },
    { name: "Hardi Patel", phone: "123-456-7893", address: "126 Main St, City, Country" },
    { name: "Harsh Gosai", phone: "123-456-7894", address: "127 Main St, City, Country" }
  ];

  const [customers, setCustomers] = useState(initialCustomers);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [newCustomer, setNewCustomer] = useState({ name: '', phone: '', address: '' });
  const [showForm, setShowForm] = useState(false);

  const handleCustomerClick = (customer) => {
    setSelectedCustomer(customer);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setCustomers([...customers, newCustomer]);
    setNewCustomer({ name: '', phone: '', address: '' });
    setShowForm(false);
  };

  return (
    <div className="customer-container">
      <Header />
      <div className="customer-content">
        <div className="customer-list">
          <div className="customer-header">Customer List
          <button className="add-customer-button" onClick={() => setShowForm(!showForm)}>+ Customer</button>
          </div>
          {customers.map((customer, index) => (
            <button key={index} className="customer-item" onClick={() => handleCustomerClick(customer)}>
              {customer.name}
            </button>
          ))}
          
        </div>
        {selectedCustomer && (
          <div className="customer-details">
            <h3>Customer Details</h3>
            <p><strong>Name:</strong> {selectedCustomer.name}</p>
            <p><strong>Phone:</strong> {selectedCustomer.phone}</p>
            <p><strong>Address:</strong> {selectedCustomer.address}</p>
          </div>
        )}
        {showForm && (
          <form className="customer-form" onSubmit={handleFormSubmit}>
            <h3>Add New Customer</h3>
            <div>
              <label>Name: </label>
              <input type="text" name="name" value={newCustomer.name} onChange={handleInputChange} required />
            </div>
            <div>
              <label>Phone: </label>
              <input type="text" name="phone" value={newCustomer.phone} onChange={handleInputChange} required />
            </div>
            <div>
              <label>Address: </label>
              <input type="text" name="address" value={newCustomer.address} onChange={handleInputChange} required />
            </div>
            <button type="submit">Add Customer</button>
          </form>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CustomerDetails;
