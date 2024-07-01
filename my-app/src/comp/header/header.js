 import React from 'react'
 import Logo from '../../comp/assets/logo.jpg'
 import '../header/header.css' 
 import { Link } from 'react-router-dom';
 import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
    return (
      // <header className = 'header'>
      //   <img className='logo' src={Logo} alt='logo'/>
      //   <nav>
      //     <button className='Customer_Details'><Link to="/customer_details">Customer Details</Link></button>
      //     <button className = 'Feedback_Check'><Link to="/feedback_check">Feedback Check</Link></button>
      //     <button className = 'Appointment_Check'><Link to="/appoinment_check">Appointment Check</Link></button>
      //     <button className = 'Service_Remainder'><Link to="/service_remainder">Service Remainder</Link></button>
      //     <button className = 'Chat_Box'><Link to="/chat_box">Chat Box</Link></button>
      //   </nav>
      // </header>
      <header className='header navbar navbar-expand-lg navbar-light bg-light'>
      <div className='container-fluid d-flex align-items-center'>
          <img className='logo navbar-brand' src={Logo} alt='logo' />
          <nav className='navbar-nav ml-auto d-flex flex-row'>
              <Link to="/customer_details" className='nav-link'>
                  <button className='btn btn-outline-primary mx-2'>Customer Details</button>
              </Link>
              <Link to="/feedback_check" className='nav-link'>
                  <button className='btn btn-outline-primary mx-2'>Feedback Check</button>
              </Link>
              <Link to="/appoinment_check" className='nav-link'>
                  <button className='btn btn-outline-primary mx-2'>Appointment Check</button>
              </Link>
              <Link to="/service_remainder" className='nav-link'>
                  <button className='btn btn-outline-primary mx-2'>Service Remainder</button>
              </Link>
              <Link to="/chat_box" className='nav-link'>
                  <button className='btn btn-outline-primary mx-2'>Chat Box</button>
              </Link>
          </nav>
      </div>
  </header>
    );
  };
  
  export default Header;
