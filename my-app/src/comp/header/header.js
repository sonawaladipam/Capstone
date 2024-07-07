// //  import React from 'react'
// //  import Logo from '../../comp/assets/logo.jpg'
// //  import '../header/header.css' 
// //  import { Link } from 'react-router-dom';
// //  import 'bootstrap/dist/css/bootstrap.min.css';

// // const Header = () => {
// //     return (
// //       <header className='header navbar navbar-expand-lg navbar-light bg-light'>
// //       <div className='container-fluid d-flex align-items-center'>
// //           <img className='logo navbar-brand' src={Logo} alt='logo' />
// //           <nav className='navbar-nav ml-auto d-flex flex-row'>
// //               <Link to="/home" className='nav-link'>
// //                   <button className='btn btn-outline-primary mx-2'>HOME</button>
// //               </Link>
// //               <Link to="/customer_details" className='nav-link'>
// //                   <button className='btn btn-outline-primary mx-2'>Customer Details</button>
// //               </Link>
// //               <Link to="/feedback_check" className='nav-link'>
// //                   <button className='btn btn-outline-primary mx-2'>Feedback Check</button>
// //               </Link>
// //               <Link to="/appoinment_check" className='nav-link'>
// //                   <button className='btn btn-outline-primary mx-2'>Appointment Check</button>
// //               </Link>
// //               <Link to="/service_remainder" className='nav-link'>
// //                   <button className='btn btn-outline-primary mx-2'>Service Remainder</button>
// //               </Link>
// //               <Link to="/chat_box" className='nav-link'>
// //                   <button className='btn btn-outline-primary mx-2'>Chat Box</button>
// //               </Link>
// //               <Link to="/" className='nav-link'>
// //                   <button className='btn btn-outline-primary mx-2'>LOG OUT</button>
// //               </Link>
// //           </nav>
// //       </div>
// //   </header>
// //     );
// //   };
  
// //   export default Header;import React, { useState } from 'react';
// import Logo from '../../comp/assets/logo.jpg';
// import '../header/header.css';
// import { Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const Header = () => {
//     const [isOpen, setIsOpen] = useState(false);

//     const toggleMenu = () => {
//         setIsOpen(!isOpen);
//     };

//     return (
//         <header className='header navbar navbar-expand-lg navbar-light bg-light'>
//             <div className='container-fluid d-flex align-items-center'>
//                 <img className='logo navbar-brand' src={Logo} alt='logo' />
//                 <button 
//                     className='navbar-toggler' 
//                     type='button' 
//                     onClick={toggleMenu}
//                 >
//                     <span className='navbar-toggler-icon'></span>
//                 </button>
//                 <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
//                     <nav className='navbar-nav ml-auto d-flex flex-column flex-lg-row'>
//                         <Link to="/home" className='nav-link'>
//                             <button className='btn btn-outline-primary mx-2'>HOME</button>
//                         </Link>
//                         <Link to="/customer_details" className='nav-link'>
//                             <button className='btn btn-outline-primary mx-2'>Customer Details</button>
//                         </Link>
//                         <Link to="/feedback_check" className='nav-link'>
//                             <button className='btn btn-outline-primary mx-2'>Feedback Check</button>
//                         </Link>
//                         <Link to="/appoinment_check" className='nav-link'>
//                             <button className='btn btn-outline-primary mx-2'>Appointment Check</button>
//                         </Link>
//                         <Link to="/service_remainder" className='nav-link'>
//                             <button className='btn btn-outline-primary mx-2'>Service Remainder</button>
//                         </Link>
//                         <Link to="/chat_box" className='nav-link'>
//                             <button className='btn btn-outline-primary mx-2'>Chat Box</button>
//                         </Link>
//                         <Link to="/" className='nav-link'>
//                             <button className='btn btn-outline-primary mx-2'>LOG OUT</button>
//                         </Link>
//                     </nav>
//                 </div>
//             </div>
//         </header>
//     );
// };

// export default Header;
import React, { useState } from 'react';
import Logo from '../../comp/assets/logo.jpg';
import './header.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="header">
            <div className="header-container">
                <img className="logo" src={Logo} alt="logo" />
                <div className={`hamburger ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
            </div>
            <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
                <Link to="/home" className="sidebar-link" onClick={toggleMenu}>Home</Link>
                <Link to="/customer_details" className="sidebar-link" onClick={toggleMenu}>Customer Details</Link>
                <Link to="/appoinment_check" className="sidebar-link" onClick={toggleMenu}>Appointment Check</Link>
                <Link to="/service_remainder" className="sidebar-link" onClick={toggleMenu}>Service Remainder</Link>
                <Link to="/" className="sidebar-link" onClick={toggleMenu}>Log Out</Link>
            </nav>
            {isOpen && <div className="backdrop" onClick={toggleMenu}></div>}
        </header>
    );
};

export default Header;

