// import React from 'react';
// import Header from '../header/header'; 
// import Footer from '../Footer/footer'; 

// const AppointmentCheck = () => {

//   const todaysAppointments = [
//     { id: 1, time: '10:00 AM', patient: 'John Doe' },
//     { id: 2, time: '11:30 AM', patient: 'Jane Smith' }
//   ];

//   const upcomingAppointments = [
//     { id: 3, time: '2:00 PM', patient: 'Michael Johnson' },
//     { id: 4, time: '3:30 PM', patient: 'Emily Brown' }
//   ];

//   return (
//     <div>
//       <Header />
//       <div className="container">
//         <section>
//           <h2>Today's Appointments</h2>
//           <ul>
//             {todaysAppointments.map(appointment => (
//               <li key={appointment.id}>
//                 {appointment.time} - {appointment.patient}
//               </li>
//             ))}
//           </ul>
//         </section>
//         <section>
//           <h2>Upcoming Appointments</h2>
//           <ul>
//             {upcomingAppointments.map(appointment => (
//               <li key={appointment.id}>
//                 {appointment.time} - {appointment.patient}
//               </li>
//             ))}
//           </ul>
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
import '../Appoinment_Check/appoinment_check.css'
import axios from 'axios';
import Layout from '../layout/layout';

const AppointmentCheck = () => {
  // Sample data for demonstration
  // const todaysAppointments = [
  //   { id: 1, time: '10:00 AM', patient: 'John Doe' },
  //   { id: 2, time: '11:30 AM', patient: 'Jane Smith' },
  //   { id: 3, time: '1:00 PM', patient: 'Alice Johnson' },
  //   { id: 4, time: '3:30 PM', patient: 'Michael Brown' }
  // ];

  // const upcomingAppointments = [
  //   { id: 5, time: '2:00 PM', patient: 'Emily White' },
  //   { id: 6, time: '4:30 PM', patient: 'Sarah Clark' },
  //   { id: 7, time: '5:45 PM', patient: 'David Lee' }
  // ];

  // State to track visibility of "See More" buttons
  // const [showTodayMore, setShowTodayMore] = useState(false);
  // const [showUpcomingMore, setShowUpcomingMore] = useState(false);
  const [todaysAppointments, setTodaysAppointments] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [showTodayMore, setShowTodayMore] = useState(false);
  const [showUpcomingMore, setShowUpcomingMore] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const responseToday = await axios.get('http://localhost:3000/api/appointments/today');
        console.log('GUI Today\'s Appointments:', responseToday.data); // Debug log
        setTodaysAppointments(responseToday.data);
        const responseUpcoming = await axios.get('http://localhost:3000/api/appointments');
        console.log('GUI Upcoming Appointments:', responseUpcoming.data); // Debug log
        setUpcomingAppointments(responseUpcoming.data);
        //const allAppointments = response.data;

        // Filter today's and upcoming appointments
        // const today = new Date().toISOString().split('T')[0];
        // const todaysAppointments = allAppointments.filter(appointment =>   
        //   new Date(appointment.AppointmentDate).toISOString().split('T')[0] === today
        // );
        // const upcomingAppointments = allAppointments.filter(appointment => 
        //   new Date(appointment.AppointmentDate).toISOString().split('T')[0] > today
        // );

        // setTodaysAppointments(todaysAppointments);
        // setUpcomingAppointments(upcomingAppointments);
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

  return (
    <div>
      <Header />
      <Layout/>
      <div className="container">
        <section>
          <h2>Today's Appointments</h2>
          <ul>
            {/* {todaysAppointments.slice(0, showTodayMore ? todaysAppointments.length : 2).map(appointment => (
              <li key={appointment.id}>
                {appointment.time} - {appointment.patient}
              </li>
            ))} */}
            {todaysAppointments.slice(0, showTodayMore ? todaysAppointments.length : 2).map(appointment => (
              <li key={appointment._id}>
                {new Date(appointment.AppointmentTime).toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' })} -
                {new Date(appointment.AppointmentTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}  - {appointment.name}
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
            {/* {upcomingAppointments.slice(0, showUpcomingMore ? upcomingAppointments.length : 2).map(appointment => (
              <li key={appointment.id}>
                {appointment.time} - {appointment.patient}
              </li>
            ))} */}
            {upcomingAppointments.slice(0, showUpcomingMore ? upcomingAppointments.length : 2).map(appointment => (
              <li key={appointment._id}>
                {new Date(appointment.AppointmentTime).toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' })} -
                {new Date(appointment.AppointmentTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {appointment.name}
              </li>
            ))}
          </ul>
          {!showUpcomingMore && (
            <button onClick={handleShowMoreUpcoming}>See More</button>
          )}
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default AppointmentCheck;
