 import React from 'react'
 import Logo from '../../comp/assets/logo.jpg'
 import '../header/header.css' 
 import { Link } from 'react-router-dom';

const Header = () => {
    return (
      <header className = 'header'>
        <img className='Logo' src={Logo} alt='logo'/>
        <nav>
          <button className='Customer_Details'><Link to="/customer_details">Customer Details</Link></button>
          <button className = 'Feedback_Check'>Feedback Check</button>
          <button className = 'Appointment_Check'>Appointment Check</button>
          <button className = 'Service_Remainder'>Service Remainder</button>
          <button className = 'Chat_Box' >Chat Box</button>
        </nav>
      </header>
    );
  };
  
  export default Header;