 import React from 'react'
 import Logo from '../../comp/assets/logo.jpg'
 import '../header/header.css' 
 import { Link } from 'react-router-dom';

const Header = () => {
    return (
      <header className = 'header'>
        <img className='logo' src={Logo} alt='logo'/>
        <nav>
          <button className='Customer_Details'><Link to="/customer_details">Customer Details</Link></button>
          <button className = 'Feedback_Check'><Link to="/feedback_check">Feedback Check</Link></button>
          <button className = 'Appointment_Check'><Link to="/appoinment_check">Appointment Check</Link></button>
          <button className = 'Service_Remainder'><Link to="/service_remainder">Service Remainder</Link></button>
          <button className = 'Chat_Box'><Link to="/chat_box">Chat Box</Link></button>
        </nav>
      </header>
    );
  };
  
  export default Header;