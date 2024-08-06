//my-app/src/comp/Appointment_Check/appointment_check.js
import React, { useState, useEffect } from 'react';
import Header from '../header/header'; // Adjust path as necessary
import Footer from '../Footer/footer'; // Adjust path as necessary
import Layout from '../../comp/layout/layout'; // Adjust path as necessary
import '../Appoinment_Check/appoinment_check.css'
import axios from 'axios';
import { FaClock, FaUser } from 'react-icons/fa';

const AppointmentCheck = () => {
  const [todaysAppointments, setTodaysAppointments] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [showTodayMore, setShowTodayMore] = useState(false);
  const [showUpcomingMore, setShowUpcomingMore] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    // AppointmentID: '',
    // ServiceID: '',
    // AppointmentDate: '',
    // AppointmentTime: '',
    // Status: '',
    // CustomerID: '',
    // name: '',
    // ReminderStatus: false,
    // ReminderPreference: '',
    // Email: ''
    name: '',
    serviceID: '',
    appointmentDate: '',
    appointmentTime: '',
    reminderPreference: ''
  });

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const responseToday = await axios.get('http://localhost:3000/api/appointments/today');
        console.log('GUI Today\'s Appointments:', responseToday.data); // Debug log
        setTodaysAppointments(responseToday.data);
        //const responseUpcoming = await axios.get('http://localhost:3000/api/appointments');
        const responseUpcoming = await axios.get('http://localhost:3000/api/appointments/future');
        console.log('GUI Upcoming Appointments:', responseUpcoming.data); // Debug log
        setUpcomingAppointments(responseUpcoming.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  const handleShowMoreToday = () => {
    setShowTodayMore(true);
  };

  const handleShowMoreUpcoming = () => {
    setShowUpcomingMore(true);
  };

  const handleAddNewAppointment = () => {
    setShowForm(true);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { name, serviceID, appointmentDate, appointmentTime, reminderPreference} = newAppointment;

      // Log individual fields
      console.log('Customer Name:', name);
      console.log('Service ID:', serviceID);
      console.log('Appointment Date:', appointmentDate);
      console.log('Appointment Time:', appointmentTime);
      console.log('Reminder Preference:', reminderPreference);
      
      // Validate the required fields before making the request
      if (!name || !serviceID || !appointmentDate || !appointmentTime || !reminderPreference) {
        alert('All fields are required');
        return;
      }

      // Ensure appointment time is in 30-minute intervals
      const appointmentDateTime = new Date(`${appointmentDate}T${appointmentTime}`);
      if (appointmentDateTime.getMinutes() % 30 !== 0) {
        alert('Appointment time must be in 30-minute intervals');
        return;
      }
    
      const response = await axios.post('http://localhost:3000/api/appointments', {
        name,
        serviceID,
        appointmentDate,
        appointmentTime,
        reminderPreference
      });

      console.log('Appointment saved:', response.data);
      setTodaysAppointments((prev) => [...prev, response.data]); // Update state with the new appointment
      setShowForm(false); // Hide form after submission
    } catch (error) {
      console.error('Error saving appointment:', error);
      alert('Error saving appointment: ' + error.response.data.message); // Show error message to the user
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewAppointment((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <Header />
      <Layout />
      <div className="c2">
        <section>
          <div className="appointment-header">
            <h2>Today's Appointments</h2>
            <button onClick={handleAddNewAppointment} className="add-appointment-button">Add New Appointment</button>
          </div>
          <ul>
            {todaysAppointments.slice(0, showTodayMore ? todaysAppointments.length : 2).map(appointment => (
              <li key={appointment._id}>
                <span className="time">
                  <FaClock className="icon" />
                  {new Date(appointment.AppointmentTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                <span className="name">
                  <FaUser className="icon" />
                  {appointment.name}
                </span>
              </li>
            ))}
          </ul>
          {!showTodayMore && (
            <button onClick={handleShowMoreToday}>See More</button>
          )}
        </section>
        <section>
          <h2>Upcoming Appointments</h2>
          <ul>
            {upcomingAppointments.slice(0, showUpcomingMore ? upcomingAppointments.length : 2).map(appointment => (
              <li key={appointment._id}>
                <span className="time">
                  <FaClock className="icon" />
                  {new Date(appointment.AppointmentTime).toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' })} - 
                  {new Date(appointment.AppointmentTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                <span className="name">
                  <FaUser className="icon" />
                  {appointment.name}
                </span>
              </li>
            ))}
          </ul>
          {!showUpcomingMore && (
            <button onClick={handleShowMoreUpcoming}>See More</button>
          )}
        </section>

        {/* Form for adding new appointment */}
        {/* Form for adding new appointment */}
        {showForm && (
          <section className="form-section">
            <h2>Add New Appointment</h2>
            <form onSubmit={handleFormSubmit}>
              {/* <label>
                Appointment ID:
                <input type="text" name="AppointmentID" value={newAppointment.AppointmentID} onChange={handleInputChange} />
              </label>
              <label>
                Customer Name:
                <input type="text" name="name" value={newAppointment.name} onChange={handleInputChange} required />
              </label>
              <label>
                Service ID:
                <input type="text" name="ServiceID" value={newAppointment.ServiceID} onChange={handleInputChange} required />
              </label>
              <label>
                Appointment Date:
                <input type="date" name="AppointmentDate" value={newAppointment.AppointmentDate} onChange={handleInputChange} required />
              </label>
              <label>
                Appointment Time:
                <input type="time" name="AppointmentTime" value={newAppointment.AppointmentTime} onChange={handleInputChange} required />
              </label>
              <label>
                Status:
                <input type="text" name="Status" value={newAppointment.Status} onChange={handleInputChange} required />
              </label>
              <label>
                Customer ID:
                <input type="text" name="CustomerID" value={newAppointment.CustomerID} onChange={handleInputChange} />
              </label>
              <label>
                Reminder Status:
                <input type="checkbox" name="ReminderStatus" checked={newAppointment.ReminderStatus} onChange={(e) => setNewAppointment((prev) => ({ ...prev, ReminderStatus: e.target.checked }))} />
              </label>
              <label>
                Reminder Preference:
                <input type="text" name="ReminderPreference" value={newAppointment.ReminderPreference} onChange={handleInputChange} required />
              </label>
              <label>
                Email:
                <input type="email" name="Email" value={newAppointment.Email} onChange={handleInputChange} />
              </label> */}
              <label>
                Customer Name:
                <input type="text" name="name" value={newAppointment.name || ''} onChange={handleInputChange} required />
              </label>
              <label>
                Service ID:
                <input type="text" name="serviceID" value={newAppointment.serviceID || ''} onChange={handleInputChange} required />
              </label>
              <label>
                Appointment Date:
                <input type="date" name="appointmentDate" value={newAppointment.appointmentDate || ''} onChange={handleInputChange} required />
              </label>
              <label>
                Appointment Time:
                <input type="time" name="appointmentTime" value={newAppointment.appointmentTime || ''} onChange={handleInputChange} required />
              </label>
              <label>
                Reminder Preference:
                <input type="text" name="reminderPreference" value={newAppointment.reminderPreference || ''} onChange={handleInputChange} required />
              </label>
              <div className="form-buttons">
                <button type="submit">Save</button>
                <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          </section>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AppointmentCheck;
