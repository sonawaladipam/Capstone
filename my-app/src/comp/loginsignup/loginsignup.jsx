import React, { useState } from 'react';
import './loginsignup.css';
import user_icon from '../assets/user.png';
import email_icon from '../assets/email.png';
import pass_icon from '../assets/pass.png';

const LoginSignup = () => {
  const [action, setAction] = useState("Sign up");
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (newAction) => {
    if (newAction !== action) {
      setAction(newAction);
      setMessage('');
      return;
    }

    if (newAction === "Sign up") {
      if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
        setMessage('Sign up unsuccessful: All fields are required.');
      } else if (formData.password !== formData.confirmPassword) {
        setMessage('Sign up unsuccessful: Passwords do not match.');
      } else {
        try {
          console.log('Form data before sending:', formData); // Debug log
          const response = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: formData.username,
              email: formData.email,
              password: formData.password
            })
          });
          const data = await response.json();
          console.log('Server response:', data); // Debug log
          if (response.ok) {
            setMessage('Sign up successful!');
          } else {
            setMessage(`Sign up unsuccessful: ${data.error}`);
          }
        } catch (error) {
          console.error('Error during fetch:', error); // Debug log
          setMessage('Sign up unsuccessful: Server error');
        }
      }
    } else if (newAction === "Login") {
      
        try {
          const response = await fetch(`http://localhost:3000/api/login?email=${formData.email}&password=${formData.password}`);
          const data = await response.json();
          if (response.ok) {
            // Redirect user to home page after successful login
            window.location.href = '/home';
            console.log("data", data);
          } else {
            setMessage(`Login unsuccessful: ${data.error}`);
          }
        } catch (error) {
          console.error('Error during fetch:', error); // Debug log
          setMessage('Login unsuccessful: Server error');
        }
      
    }
  };

  return (
    <div className='container'>
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(action); }}>
        <div className="inputs">
          {action === "Sign up" && (
            <div className="input">
              <img src={user_icon} alt="user" />
              <input
                type="text"
                name="username"
                placeholder="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
          )}
          <div className="input">
            <img src={email_icon} alt="email" />
            <input
              type="email"
              name="email"
              placeholder="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <img src={pass_icon} alt="password" />
            <input
              type="password"
              name="password"
              placeholder="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          {action === "Sign up" && (
            <div className="input">
              <img src={pass_icon} alt="password" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          )}
        </div>
        {action === "Login" && (
          <div className="forget-pass">
            forget password? <span>click here</span>
          </div>
        )}
        {message && (
          <div className={message.includes('unsuccessful') ? 'error' : 'success'}>
            {message}
          </div>
        )}
        <div className="submit-cont">
          <div>
            <button
              type="button"
              className={action === "Sign up" ? "submit" : "submit gray"}
              onClick={() => handleSubmit("Sign up")}
            >
              Sign up
            </button>
          </div>
          <div>
            <button
              type="button"
              className={action === "Login" ? "submit" : "submit gray"}
              onClick={() => handleSubmit("Login")}
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginSignup;
