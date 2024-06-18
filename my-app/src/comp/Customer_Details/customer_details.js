// import React from 'react'
// import Header from '../header/header';
// import Footer from '../Footer/footer';
// // export default function customer_details() {
// //   return (
// //     <div>customer_details</div>
// //   )
// // }

// const CustomerDetails = () => {
//   const customers = ["Arha Sonawala", "Dipam Sonawala", "Malhar Mehta", "Hardi Patel", "Harsh Gosai"];

//   return (
    
    
//     <div className="customer-container">
//       <div>
//         <Header/>
//       </div>
//       <div className="customer-header">Customer List</div>
//       <div className="customer-list">
//         {customers.map((customer, index) => (
//           <div>
//           <button key={index} className="customer-item">
//             {customer}
//             </button>
//           </div>
//         ))}
//       </div>
//       <div>
//         <Footer/>
//       </div>
//     </div>

//   );
// };

// export default CustomerDetails;


import React, { useState } from 'react';
import Header from '../header/header';
import Footer from '../Footer/footer';
import './customer_details.css';

const CustomerDetails = () => {
  const customers = [
    { name: "Arha Sonawala", phone: "123-456-7890", address: "123 Main St, City, Country" },
    { name: "Dipam Sonawala", phone: "123-456-7891", address: "124 Main St, City, Country" },
    { name: "Malhar Mehta", phone: "123-456-7892", address: "125 Main St, City, Country" },
    { name: "Hardi Patel", phone: "123-456-7893", address: "126 Main St, City, Country" },
    { name: "Harsh Gosai", phone: "123-456-7894", address: "127 Main St, City, Country" }
  ];

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleCustomerClick = (customer) => {
    setSelectedCustomer(customer);
  };

  return (
    <div className="customer-container">
      <Header />
      <div className="customer-content">
        <div className="customer-list">
          <div className="customer-header">Customer List</div>
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
      </div>
      <Footer />
    </div>
  );
};

export default CustomerDetails;
