// import React from 'react';
// import { Link } from 'react-router-dom';
// import Logo from '../../comp/assets/logo.jpg';
// import './layout.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const Sidebar = () => {
//     return (
//         <nav className="sidebar fixed">
//             <div className="sidebar-logo-container">
//                 <img className="logo" src={Logo} alt="logo" />
//             </div>
//             <Link to="/home" className="sidebar-link">Home</Link>
//             <Link to="/customer_details" className="sidebar-link">Customer Details</Link>
//             <Link to="/feedback_check" className="sidebar-link">Feedback Check</Link>
//             <Link to="/appoinment_check" className="sidebar-link">Appointment Check</Link>
//             <Link to="/service_remainder" className="sidebar-link">Service Reminder</Link>
//             <Link to="/chat_box" className="sidebar-link">Chat Box</Link>
//             <Link to="/" className="sidebar-link">Log Out</Link>
//         </nav>
//     );
// };

// const Layout = ({ children }) => {
//     return (
//         <div className="layout">
//             <Sidebar />
//             <div className="content">
//                 {children}
//             </div>
//         </div>
//     );
// };

// export default Layout;
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../comp/assets/logo.jpg';
import './layout.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Sidebar = () => {
    return (
        <nav className="sidebar fixed">
            <div className="sidebar-logo-container">
                <img className="logo" src={Logo} alt="logo" />
            </div>
            <Link to="/home" className="sidebar-link">Home</Link>
            <Link to="/customer_details" className="sidebar-link">Customer </Link>
            <Link to="/appoinment_check" className="sidebar-link">Appointments</Link>
            <Link to="/service_remainder" className="sidebar-link">Reminder</Link>
            <Link to="/" className="sidebar-link">Log Out</Link>
        </nav>
    );
};

const Layout = ({ children }) => {
    return (
        <div className="layout">
            <Sidebar />
            <div className="content">
                {children}
            </div>
        </div>
    );
};

export default Layout;
