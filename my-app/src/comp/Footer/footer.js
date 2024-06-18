import React from 'react'

import '../Footer/footer.css'; // Optional: Create a CSS file to style your footer

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
                <p>
                    <a href="/privacy-policy">Privacy Policy</a> | <a href="/terms-of-service">Terms of Service</a>
                </p>
                <p>Follow us on:
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"> Facebook</a>,
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"> Twitter</a>,
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"> Instagram</a>
                </p>
            </div>
        </footer>
    );
}

export default Footer;
