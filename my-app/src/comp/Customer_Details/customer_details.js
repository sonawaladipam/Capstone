import React, { useState, useEffect, useRef } from 'react';
import Header from '../header/header';
import Footer from '../Footer/footer';
import axios from 'axios';
import './customer_details.css';
import Layout from '../layout/layout';
import AppointmentsModal from '../AppointmentsModal/AppointmentsModal';

const CustomerDetails = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newCustomer, setNewCustomer] = useState({ name: '', phone: '', address: '', email: '' });
  const [editCustomer, setEditCustomer] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nameInputRef = useRef(null); // Create a ref for the name input field

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/customers');
        setCustomers(response.data);
        setFilteredCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };
    fetchCustomers();
  }, []);

  useEffect(() => {
    const results = customers.filter(customer =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCustomers(results);
  }, [searchTerm, customers]);

  useEffect(() => {
    if (showAddForm) {
      nameInputRef.current.focus(); // Focus on the name input when the add form is shown
    }
  }, [showAddForm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (showEditForm) {
      setEditCustomer({ ...editCustomer, [name]: value });
    } else {
      setNewCustomer({ ...newCustomer, [name]: value });
    }
  };

  const handleAddFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/customers', newCustomer);
      setCustomers([...customers, response.data]);
      setFilteredCustomers([...customers, response.data]);
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
      setFilteredCustomers(customers.map((cust) => (cust._id === editCustomer._id ? response.data : cust)));
      setEditCustomer(null);
      setShowEditForm(false);
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  const handleCustomerClick = async (customer) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/appointments?customerId=${customer._id}`);
      setAppointments(response.data);
      setSelectedCustomer(customer);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  return (
    <div className="customer-container">
      <Header />
      <Layout />
      <main className="customer-content">
        <div className="customer-list">
          <div className="customer-header">
            <strong>Customer List</strong>
            <input 
              type="text" 
              placeholder="Search customers..." 
              value={searchTerm} 
              onChange={handleSearchChange} 
              className="search-bar" 
            />
            <button className="add-customer-button" onClick={() => { setShowAddForm(true); setShowEditForm(false); }}>
              Add New Customer
            </button>
          </div>
          <table className="customer-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer._id} onClick={() => handleCustomerClick(customer)}>
                  <td>{customer.name}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.address}</td>
                  <td>{customer.email}</td>
                  <td><button onClick={() => { setEditCustomer(customer); setShowEditForm(true); setShowAddForm(false); }}>Edit</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showAddForm && (
          <div className="customer-form-container">
            <form className="customer-form" onSubmit={handleAddFormSubmit}>
              <h3>Add New Customer</h3>
              <div>
                <label>Name: </label>
                <input 
                  type="text" 
                  name="name" 
                  value={newCustomer.name} 
                  onChange={handleInputChange} 
                  required 
                  ref={nameInputRef} // Attach the ref to the input field
                />
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
              <button type="button" onClick={() => setShowAddForm(false)}>Cancel</button>
            </form>
          </div>
        )}
        {showEditForm && editCustomer && (
          <div className="customer-form-container">
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
              <button type="button" onClick={() => setShowEditForm(false)}>Cancel</button>
            </form>
          </div>
        )}
      </main>
      <Footer />
      <AppointmentsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        appointments={appointments} 
      />
    </div>
  );
};

export default CustomerDetails;
