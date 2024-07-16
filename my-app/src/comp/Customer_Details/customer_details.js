// import React, { useState, useEffect } from 'react';
// import Header from '../header/header';
// import Footer from '../Footer/footer';
// import './customer_details.css';
// import axios from 'axios';
// import Layout from '../layout/layout';

// const CustomerDetails = () => {
//   const [customers, setCustomers] = useState([]);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [newCustomer, setNewCustomer] = useState({ name: '', phone: '', address: '', email: '' });
//   const [editCustomer, setEditCustomer] = useState(null);
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [showEditForm, setShowEditForm] = useState(false);

//   useEffect(() => {
//     const fetchCustomers = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/customers');
//         setCustomers(response.data);
//       } catch (error) {
//         console.error('Error fetching customers:', error);
//       }
//     };
//     fetchCustomers();
//   }, []);

//   const handleCustomerClick = (customer) => {
//     setSelectedCustomer(customer);
//     setEditCustomer(customer);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (editCustomer) {
//       setEditCustomer({ ...editCustomer, [name]: value });
//     } else {
//       setNewCustomer({ ...newCustomer, [name]: value });
//     }
//   };

//   const handleAddFormSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:3000/api/customers', newCustomer);
//       setCustomers([...customers, response.data]);
//       setNewCustomer({ name: '', phone: '', address: '', email: '' });
//       setShowAddForm(false);
//     } catch (error) {
//       console.error('Error adding customer:', error);
//     }
//   };

//   const handleEditFormSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.put(`http://localhost:3000/api/customers/${editCustomer._id}`, editCustomer);
//       setCustomers(customers.map((cust) => (cust._id === editCustomer._id ? response.data : cust)));
//       setEditCustomer(null);
//       setSelectedCustomer(null);
//       setShowEditForm(false);
//     } catch (error) {
//       console.error('Error updating customer:', error);
//     }
//   };

//   return (
//     <div className="customer-container">
//       <Header />
//       <Layout />
//       <div className="customer-content">
//         <div className="customer-list">
//           <div className="customer-header">
//             Customer List
//             <button className="add-customer-button" onClick={() => { setShowAddForm(true); setShowEditForm(false); }}>Add New Customer</button>
//           </div>
//           <table className="customer-table">
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Phone</th>
//                 <th>Address</th>
//                 <th>Email</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {customers.map((customer) => (
//                 <tr key={customer._id} onClick={() => handleCustomerClick(customer)} className={selectedCustomer && selectedCustomer._id === customer._id ? 'selected' : ''}>
//                   <td>{customer.name}</td>
//                   <td>{customer.phone}</td>
//                   <td>{customer.address}</td>
//                   <td>{customer.email}</td>
//                   <td><button onClick={(e) => { e.stopPropagation(); setShowEditForm(true); setShowAddForm(false); setEditCustomer(customer); }}>Edit</button></td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <div className="customer-details">
//           {selectedCustomer && (
//             <div className="customer-card">
//               <h3>Customer Details</h3>
//               <p><strong>Name:</strong> {selectedCustomer.name}</p>
//               <p><strong>Phone:</strong> {selectedCustomer.phone}</p>
//               <p><strong>Address:</strong> {selectedCustomer.address}</p>
//               <p><strong>Email:</strong> {selectedCustomer.email}</p>
//               <button className="edit-customer-button" onClick={() => { setShowEditForm(true); setShowAddForm(false); }}>Edit Customer</button>
//             </div>
//           )}
//           {showAddForm && (
//             <form className="customer-form" onSubmit={handleAddFormSubmit}>
//               <h3>Add New Customer</h3>
//               <div>
//                 <label>Name: </label>
//                 <input type="text" name="name" value={newCustomer.name} onChange={handleInputChange} required />
//               </div>
//               <div>
//                 <label>Phone: </label>
//                 <input type="text" name="phone" value={newCustomer.phone} onChange={handleInputChange} required />
//               </div>
//               <div>
//                 <label>Address: </label>
//                 <input type="text" name="address" value={newCustomer.address} onChange={handleInputChange} required />
//               </div>
//               <div>
//                 <label>Email: </label>
//                 <input type="email" name="email" value={newCustomer.email} onChange={handleInputChange} required />
//               </div>
//               <button type="submit">Add Customer</button>
//             </form>
//           )}
//           {showEditForm && (
//             <form className="customer-form" onSubmit={handleEditFormSubmit}>
//               <h3>Edit Customer</h3>
//               <div>
//                 <label>Name: </label>
//                 <input type="text" name="name" value={editCustomer.name} onChange={handleInputChange} required />
//               </div>
//               <div>
//                 <label>Phone: </label>
//                 <input type="text" name="phone" value={editCustomer.phone} onChange={handleInputChange} required />
//               </div>
//               <div>
//                 <label>Address: </label>
//                 <input type="text" name="address" value={editCustomer.address} onChange={handleInputChange} required />
//               </div>
//               <div>
//                 <label>Email: </label>
//                 <input type="email" name="email" value={editCustomer.email} onChange={handleInputChange} required />
//               </div>
//               <button type="submit">Update Customer</button>
//             </form>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default CustomerDetails;
import React, { useState, useEffect } from 'react';
import Header from '../header/header';
import Footer from '../Footer/footer';
import axios from 'axios';
import './customer_details.css';
import Layout from '../layout/layout';

const CustomerDetails = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newCustomer, setNewCustomer] = useState({ name: '', phone: '', address: '', email: '' });
  const [editCustomer, setEditCustomer] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

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

  return (
    <div className="customer-container">
      <Header />
      <Layout/>
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
            <button className="add-customer-button" onClick={() => { setShowAddForm(true); setShowEditForm(false); }}>Add New Customer</button>
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
                <tr key={customer._id}>
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
    </div>
  );
};

export default CustomerDetails;
