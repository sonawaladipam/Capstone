// import React, { useState, useEffect } from 'react';
// import Header from '../header/header'; // Adjust path as necessary
// import Footer from '../Footer/footer'; // Adjust path as necessary
// import Layout from '../../comp/layout/layout'; // Adjust path as necessary
// import '../Appoinment_Check/appoinment_check.css'
// import axios from 'axios';
// import { FaClock, FaUser } from 'react-icons/fa';

// const AppointmentCheck = () => {

//   const [todaysAppointments, setTodaysAppointments] = useState([]);
//   const [upcomingAppointments, setUpcomingAppointments] = useState([]);
//   const [showTodayMore, setShowTodayMore] = useState(false);
//   const [showUpcomingMore, setShowUpcomingMore] = useState(false);

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const responseToday = await axios.get('http://localhost:3000/api/appointments/today');
//         console.log('GUI Today\'s Appointments:', responseToday.data); // Debug log
//         setTodaysAppointments(responseToday.data);
//         const responseUpcoming = await axios.get('http://localhost:3000/api/appointments');
//         console.log('GUI Upcoming Appointments:', responseUpcoming.data); // Debug log
//         setUpcomingAppointments(responseUpcoming.data);
    
//       } catch (error) {
//         console.error('Error fetching appointments:', error);
//       }
//     };

//     fetchAppointments();
//   }, []);

//   const handleShowMoreToday = () => {
//     setShowTodayMore(true);
//   };

//   const handleShowMoreUpcoming = () => {
//     setShowUpcomingMore(true);
//   };

 
//   return (
//     <div>
//       <Header />
//       <Layout />
//       <div className="c2">
//         <section>
//           <h2>Today's Appointments</h2>
//           <ul>
//             {todaysAppointments.slice(0, showTodayMore ? todaysAppointments.length : 2).map(appointment => (
//               <li key={appointment._id}>
//                 <span className="time">
//                   <FaClock className="icon" />
//                   {new Date(appointment.AppointmentTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                 </span>
//                 <span className="name">
//                   <FaUser className="icon" />
//                   {appointment.name}
//                 </span>
//               </li>
//             ))}
//           </ul>
//           {!showTodayMore && (
//             <button onClick={handleShowMoreToday}>See More</button>
//           )}
//         </section>
//         <section>
//           <h2>Upcoming Appointments</h2>
//           <ul>
//             {upcomingAppointments.slice(0, showUpcomingMore ? upcomingAppointments.length : 2).map(appointment => (
//               <li key={appointment._id}>
//                 <span className="time">
//                   <FaClock className="icon" />
//                   {new Date(appointment.AppointmentTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                 </span>
//                 <span className="name">
//                   <FaUser className="icon" />
//                   {appointment.name}
//                 </span>
//               </li>
//             ))}
//           </ul>
//           {!showUpcomingMore && (
//             <button onClick={handleShowMoreUpcoming}>See More</button>
//           )}
//         </section>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default AppointmentCheck;
import React, { useState, useEffect } from 'react';
import Header from '../header/header'; // Adjust path as necessary
import Footer from '../Footer/footer'; // Adjust path as necessary
//import Layout from '../../comp/layout/layout'; // Adjust path as necessary
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
    name: '',
    serviceID: '',
    appointmentDate: '',
    appointmentTime: '',
    status: '',
    customerID: ''
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
      const response = await axios.post('http://localhost:3000/api/appointments', newAppointment);
      console.log('Appointment saved:', response.data);
      setTodaysAppointments((prev) => [...prev, response.data]); // Update state with the new appointment
      setShowForm(false); // Hide form after submission
    } catch (error) {
      console.error('Error saving appointment:', error);
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
        {showForm && (
          <section className="form-section">
            <h2>Add New Appointment</h2>
            <form onSubmit={handleFormSubmit}>
              <label>
                Customer Name:
                <input type="text" name="name" value={newAppointment.name} onChange={handleInputChange} required />
              </label>
              <label>
                Service ID:
                <input type="text" name="serviceID" value={newAppointment.serviceID} onChange={handleInputChange} required />
              </label>
              <label>
                Appointment Date:
                <input type="date" name="appointmentDate" value={newAppointment.appointmentDate} onChange={handleInputChange} required />
              </label>
              <label>
                Appointment Time:
                <input type="time" name="appointmentTime" value={newAppointment.appointmentTime} onChange={handleInputChange} required />
              </label>
              <label>
                Status:
                <input type="text" name="status" value={newAppointment.status} onChange={handleInputChange} required />
              </label>
              <label>
                Customer ID:
                <input type="text" name="customerID" value={newAppointment.customerID} onChange={handleInputChange} required />
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
