import React, { useState, useEffect } from 'react';
import Header from '../header/header';
import Footer from '../Footer/footer';
import Layout from '../layout/layout';
import axios from 'axios';
import Modal from '../Modal/Modal';
import '../Service_Remainder/service_remainder'; // Ensure CSS file is correctly imported

const ServiceReminder = () => {
  const [appointments, setAppointments] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/reminders/upcoming');
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  const handleSeeMore = () => {
    setShowAll(true);
  };

  const handleSendReminder = (appointment) => {
    setCurrentAppointment(appointment);
    setMessage(`This is a reminder for your schedule ${appointment.name} on ${new Date(appointment.AppointmentDate).toLocaleString()}.`);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalSend = () => {
    const email = `${currentAppointment.Email}`;
    const subject = `Reminder: ${currentAppointment.name}`;

    axios.post('http://localhost:3000/api/reminders/send-reminder', {
      email,
      subject,
      text: message,
      appointmentId: currentAppointment._id
    })
    .then(response => {
      console.log('appointmentId: ', currentAppointment._id);
      console.log('Email sent successfully: ', response.data);
      setAppointments(prevAppointments =>
        prevAppointments.map(appointment =>
          appointment._id === currentAppointment._id
            ? { ...appointment, ReminderStatus: true }
            : appointment
        )
      );
    })
    .catch(error => {
      console.error('Error sending email:', error);
    });

    setShowModal(false);
  };

  return (
    <div>
      <Header />
      <Layout />
      <div className="c6">
        <section className="service-reminder">
          <h2>Service Reminders</h2>
          <table className="appointment-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.slice(0, showAll ? appointments.length : 3).map(appointment => (
                <tr key={appointment.AppointmentID} className="appointment-row">
                  <td>{new Date(appointment.AppointmentTime).toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                  <td>{new Date(appointment.AppointmentTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                  <td>{appointment.name}</td>
                  <td>
                    <span className={`status-badge ${appointment.ReminderStatus ? 'sent' : 'not-sent'}`}>
                      {appointment.ReminderStatus ? 'Sent' : 'Not Sent'}
                    </span>
                  </td>
                  <td>
                    <button
                      className={`send-reminder-button ${appointment.ReminderStatus ? 'disabled' : ''}`}
                      onClick={() => handleSendReminder(appointment)}
                      disabled={appointment.ReminderStatus}
                    >
                      Send Reminder
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!showAll && (
            <button className="see-more-button" onClick={handleSeeMore}>See More</button>
          )}
        </section>
      </div>
      <Footer />
      {showModal && (
        <Modal 
          show={showModal} 
          onClose={handleModalClose} 
          onSend={handleModalSend}
          appointment={currentAppointment}
          message={message}
          setMessage={setMessage}
        />
      )}
    </div>
  );
};

export default ServiceReminder;
