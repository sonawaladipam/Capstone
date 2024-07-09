import React, { useState, useEffect } from 'react';
import Header from '../header/header';
import Footer from '../Footer/footer';
import './customer_details.css';
import axios from 'axios';

const CustomerDetails = () => {

//  const [customers, setCustomers] = useState(initialCustomers);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [newCustomer, setNewCustomer] = useState({ name: '', phone: '', address: '' , email: ''});
  const [editCustomer, setEditCustomer] = useState(null);
  //const [showForm, setShowForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

// Fetch customers from the backend
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/customers');
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };
    fetchCustomers();
  }, []);

  const handleCustomerClick = (customer) => {
    setSelectedCustomer(customer);
    setEditCustomer(customer);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editCustomer) {
      setEditCustomer({ ...editCustomer, [name]: value });
    } else {
      setNewCustomer({ ...newCustomer, [name]: value });
    }
  };

  // const handleFormSubmit = async (e) => {
  //   e.preventDefault();
  //   if (editCustomer) {
  //     // Update customer details
  //     try {
  //       const response = await axios.put(`http://localhost:3000/api/customers/${editCustomer._id}`, editCustomer);
  //       setCustomers(customers.map((cust) => (cust._id === editCustomer._id ? response.data : cust)));
  //       setEditCustomer(null);
  //       setSelectedCustomer(null);
  //     } catch (error) {
  //       console.error('Error updating customer:', error);
  //     }
  //   } else {
  //     // Add new customer
  //     try{
  //       const response = await axios.post('http://localhost:3000/api/customers', newCustomer);
  //       setCustomers([...customers, newCustomer]);
  //       setNewCustomer({ name: '', phone: '', address: '', email: '' });
  //       setShowForm(false);
  //     }
  //     catch(error){
  //       console.error('Error adding customer:', error);
  //     }
  //   }
  // };

  const handleAddFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/customers', newCustomer);
      setCustomers([...customers, response.data]);
      setNewCustomer({ name: '', phone: '', address: '', email: '' });
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/api/customers/${editCustomer._id}`, editCustomer);
      setCustomers(customers.map((cust) => (cust._id === editCustomer._id ? response.data : cust)));
      setEditCustomer(null);
      setSelectedCustomer(null);
      setShowEditForm(false);
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  return (
    <div className="customer-container">
      <Header />
      <div className="customer-content">
        <div className="customer-list">
          <div className="customer-header">Customer List
            <button className="add-customer-button" onClick={() => { setShowAddForm(true); setShowEditForm(false); }}>Add New Customer</button>
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
            <p><strong>Email:</strong> {selectedCustomer.email}</p>
            <button className="edit-customer-button" onClick={() => { setShowEditForm(true); setShowAddForm(false); }}>Edit Customer</button>
          </div>
        )}
        {/* {showForm && (
          <form className="customer-form" onSubmit={handleFormSubmit}>
            <h3>{editCustomer ? 'Edit Customer' : 'Add New Customer'}</h3>
            <div>
              <label>Name: </label>
              <input type="text" name="name" value={editCustomer ? editCustomer.name : newCustomer.name} onChange={handleInputChange} required />
            </div>
            <div>
              <label>Phone: </label>
              <input type="text" name="phone" value={editCustomer ? editCustomer.phone : newCustomer.phone} onChange={handleInputChange} required />
            </div>
            <div>
              <label>Address: </label>
              <input type="text" name="address" value={editCustomer ? editCustomer.address : newCustomer.address} onChange={handleInputChange} required />
            </div>
            <div>
              <label>Email: </label>
              <input type="email" name="email" value={editCustomer ? editCustomer.email : newCustomer.email} onChange={handleInputChange} required />
            </div>
            <button type="submit">{editCustomer ? 'Update Customer' : 'Add Customer'}</button>
          </form>
        )} */}
        {showAddForm && (
          <form className="customer-form" onSubmit={handleAddFormSubmit}>
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
            <div>
              <label>Email: </label>
              <input type="email" name="email" value={newCustomer.email} onChange={handleInputChange} required />
            </div>
            <button type="submit">Add Customer</button>
          </form>
        )}
        {showEditForm && (
          <form className="customer-form" onSubmit={handleEditFormSubmit}>
            <h3>Edit Customer</h3>
            <div>
              <label>Name: </label>
              <input type="text" name="name" value={editCustomer.name} onChange={handleInputChange} required />
            </div>
            <div>
              <label>Phone: </label>
              <input type="text" name="phone" value={editCustomer.phone} onChange={handleInputChange} required />
            </div>
            <div>
              <label>Address: </label>
              <input type="text" name="address" value={editCustomer.address} onChange={handleInputChange} required />
            </div>
            <div>
              <label>Email: </label>
              <input type="email" name="email" value={editCustomer.email} onChange={handleInputChange} required />
            </div>
            <button type="submit">Update Customer</button>
          </form>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CustomerDetails;
