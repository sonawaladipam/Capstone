import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profile from '../../comp/assets/profile-user.png'; // Adjust the import path as necessary
import logoutimg from '../../comp/assets/logout.png'; // Adjust the import path as necessary
import './header.css';

const Header = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = () => {
        // Add your logout logic here
        console.log('User logged out');
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <header className="header d-flex justify-content-end p-3">
            <div className="icon-container" onClick={toggleDropdown}>
                <img src={profile} alt="Profile" className="icon" />
                {dropdownOpen && (
                    <div className="dropdown-menu">
                        <Link to="/profile" className="dropdown-item">Username</Link>
                        <Link to="/settings" className="dropdown-item">Settings</Link>
                    </div>
                )}
            </div>
            <button className="btn btn-link icon-container" onClick={handleLogout}>
                <img src={logoutimg} alt="Logout" className="icon" />
            </button>
        </header>
    );
};

export default Header;
