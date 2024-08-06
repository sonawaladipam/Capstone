import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faCalendarAlt, faBell, faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Logo from '../../comp/assets/logo.jpg';
import './layout.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Sidebar = () => {
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    const handleLogout = async () => {
        try {
            const response = await fetch('/api/logout', {
                method: 'GET',
                credentials: 'include',
            });
    
            if (response.ok) {
                // Clear session or token data if stored in localStorage or cookies
                localStorage.removeItem('authToken'); // Example if using localStorage
    
                // Redirect to login page
                navigate('/', { replace: true });
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };
    

    return (
        <nav className="sidebar fixed">
            <div className="sidebar-logo-container">
                <img className="logo" src={Logo} alt="logo" />
            </div>
            <Link to="/home" className="sidebar-link">
                <FontAwesomeIcon icon={faHome} /> Home
            </Link>
            <Link to="/customer_details" className="sidebar-link">
                <FontAwesomeIcon icon={faUsers} /> Customer
            </Link>
            <Link to="/appoinment_check" className="sidebar-link">
                <FontAwesomeIcon icon={faCalendarAlt} /> Appointments
            </Link>
            <Link to="/service_remainder" className="sidebar-link">
                <FontAwesomeIcon icon={faBell} /> Reminder
            </Link>
            <Link to="/profile" className="sidebar-link">
                <FontAwesomeIcon icon={faUserCircle} /> Profile
            </Link>
            <Link
                to="#"
                onClick={(e) => {
                    e.preventDefault();
                    handleLogout();
                }}
                className="sidebar-link"
            >
                <FontAwesomeIcon icon={faSignOutAlt} /> Log Out
            </Link>
        </nav>
    );
};

const Layout = ({ children }) => {
    return (
        <div className="layout">
            <Sidebar />
            {children}
        </div>
    );
};

export default Layout;
