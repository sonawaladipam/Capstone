import React, { useState } from 'react';
import Header from '../header/header'; // Adjust path as necessary
import Footer from '../Footer/footer'; // Adjust path as necessary
import Layout from '../layout/layout';
import axios from 'axios';

const ServiceReminder = () => {
  // Sample data for demonstration
  const serviceReminders = [
    { id: 1, date: '2024-06-19', description: 'Oil change' },
    { id: 2, date: '2024-06-22', description: 'Dentist appointment' },
    { id: 3, date: '2024-06-25', description: 'Annual physical checkup' },
    { id: 4, date: '2024-07-01', description: 'Car service' },
    { id: 5, date: '2024-07-05', description: 'Home maintenance' },
    { id: 6, date: '2024-07-10', description: 'Gardening service' }
  ];

  // State to track visibility of "See More" button
  const [showAll, setShowAll] = useState(false);

  const handleSeeMore = () => {
    setShowAll(true);
  };

  const sendEmailReminder = (email, subject, text) => {
    console.log('Sending email reminder:', { email, subject, text });
    axios.post('http://localhost:3000/send-reminder', {
      email: email,
      subject: subject,
      text: text
    })
    .then(response => {
      console.log('Email sent successfully:', response.data);
    })
    .catch(error => {
      console.error('Error sending email:', error);
    });
  };

  const handleSendReminder = (reminder) => {
    const email = 'dipamdpm@gmail.com'; // Change this to the recipient's email address
    const subject = `Reminder: ${reminder.description}`;
    const text = `This is a reminder for your scheduled ${reminder.description} on ${reminder.date}.`;
    sendEmailReminder(email, subject, text);
  };

  return (
    <div>
      <Header />
      <Layout/>
      <div className="container">
        <section>
          <h2>Service Reminders</h2>
          <ul>
            {serviceReminders.slice(0, showAll ? serviceReminders.length : 3).map(reminder => (
              <li key={reminder.id}>
                {reminder.date} - {reminder.description}
                <button onClick={() => handleSendReminder(reminder)}>Send Reminder</button>
              </li>
            ))}
          </ul>
          {!showAll && (
            <button onClick={handleSeeMore}>See More</button>
          )}
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ServiceReminder;
