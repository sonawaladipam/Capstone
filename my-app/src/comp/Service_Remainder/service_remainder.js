// import React, { useState } from 'react';
// import Header from '../header/header'; // Adjust path as necessary
// import Footer from '../Footer/footer'; // Adjust path as necessary
// import Layout from '../layout/layout';
// import axios from 'axios';

// const ServiceReminder = () => {
//   // Sample data for demonstration
//   const serviceReminders = [
//     { id: 1, date: '2024-06-19', description: 'Oil change' },
//     { id: 2, date: '2024-06-22', description: 'Dentist appointment' },
//     { id: 3, date: '2024-06-25', description: 'Annual physical checkup' },
//     { id: 4, date: '2024-07-01', description: 'Car service' },
//     { id: 5, date: '2024-07-05', description: 'Home maintenance' },
//     { id: 6, date: '2024-07-10', description: 'Gardening service' }
//   ];

//   // State to track visibility of "See More" button
//   const [showAll, setShowAll] = useState(false);

//   const handleSeeMore = () => {
//     setShowAll(true);
//   };

//   const sendEmailReminder = (email, subject, text) => {
//     console.log('Sending email reminder:', { email, subject, text });
//     axios.post('http://localhost:3000/send-reminder', {
//       email: email,
//       subject: subject,
//       text: text
//     })
//     .then(response => {
//       console.log('Email sent successfully:', response.data);
//     })
//     .catch(error => {
//       console.error('Error sending email:', error);
//     });
//   };

//   const handleSendReminder = (reminder) => {
//     const email = 'dipamdpm@gmail.com'; // Change this to the recipient's email address
//     const subject = `Reminder: ${reminder.description}`;
//     const text = `This is a reminder for your scheduled ${reminder.description} on ${reminder.date}.`;
//     sendEmailReminder(email, subject, text);
//   };

//   return (
//     <div>
//       <Header />
//       <Layout/>
//       <div className="container">
//         <section>
//           <h2>Service Reminders</h2>
//           <ul>
//             {serviceReminders.slice(0, showAll ? serviceReminders.length : 3).map(reminder => (
//               <li key={reminder.id}>
//                 {reminder.date} - {reminder.description}
//                 <button onClick={() => handleSendReminder(reminder)}>Send Reminder</button>
//               </li>
//             ))}
//           </ul>
//           {!showAll && (
//             <button onClick={handleSeeMore}>See More</button>
//           )}
//         </section>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default ServiceReminder;
// --------------------------------------------------------------------------------------------

// import React, { useState, useEffect } from 'react';
// import Header from '../header/header';
// import Footer from '../Footer/footer';
// import Layout from '../layout/layout';
// import axios from 'axios';

// const ServiceReminder = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [showAll, setShowAll] = useState(false);

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const currentDate = new Date();
//         const next24Hours = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);

//         const response = await axios.get('http://localhost:3000/api/reminders/upcoming', {
//           params: {
//             startDate: currentDate.toISOString(),
//             endDate: next24Hours.toISOString()
//          }
//         });

//         setAppointments(response.data);
//       } catch (error) {
//       console.error('Error fetching appointments:', error);
//     }
//   };

//   fetchAppointments();
// }, []);

// const handleSeeMore = () => {
//   setShowAll(true);
// };

// const sendEmailReminder = (email, subject, text) => {
//   axios.post('http://localhost:3000/send-reminder', {
//     email,
//     subject,
//     text
//   })
//   .then(response => {
//     console.log('Email sent successfully:', response.data);
//   })
//   .catch(error => {
//     console.error('Error sending email:', error);
//   });
// };

// const handleSendReminder = (appointment) => {
//   const email = 'dipamdpm@gmail.com'; // Change this to the recipient's email address
//   const subject = `Reminder: ${appointment.name}`;
//   const text = `This is a reminder for your scheduled ${appointment.name} on ${appointment.AppointmentDate}.`;
//   sendEmailReminder(email, subject, text);
// };

// return (
//   <div>
//     <Header />
//     <Layout />
//     <div className="container">
//       <section>
//         <h2>Service Reminders</h2>
//         <ul>
//           {appointments.slice(0, showAll ? appointments.length : 3).map(appointment => (
//             <li key={appointment.AppointmentID}>
//               {new Date(appointment.AppointmentTime).toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' })} - 
//               {new Date(appointment.AppointmentTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {appointment.name}
//               <button onClick={() => handleSendReminder(appointment)}>Send Reminder</button>
//             </li>
//           ))}
//         </ul>
//         {!showAll && (
//           <button onClick={handleSeeMore}>See More</button>
//         )}
//       </section>
//     </div>
//     <Footer />
//   </div>
//   );
// };

// export default ServiceReminder;
//-------------------------------------------------------------------------------------------------

import React, { useState, useEffect } from 'react';
import Header from '../header/header';
import Footer from '../Footer/footer';
import Layout from '../layout/layout';
import axios from 'axios';
import Modal from '../Modal/Modal'; // Adjust path as necessary

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
      <div className="container">
        <section>
          <h2>Service Reminders</h2>
          <ul>
            {appointments.slice(0, showAll ? appointments.length : 3).map(appointment => (
              <li key={appointment.AppointmentID}>
                {new Date(appointment.AppointmentTime).toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' })} - 
                {new Date(appointment.AppointmentTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {appointment.name}
                <span style={{ marginLeft: '10px' }}>
                  {appointment.ReminderStatus ? 'Status: Sent' : 'Status: Not Sent'}
                </span>
                {/* <button onClick={() => handleSendReminder(appointment)}>Send Reminder</button> */}
                <button onClick={() => handleSendReminder(appointment)} disabled={appointment.ReminderStatus}>
                  Send Reminder
                </button>
              </li>
            ))}
          </ul>
          {!showAll && (
            <button onClick={handleSeeMore}>See More</button>
          )}
        </section>
      </div>
      <Footer />
      <Modal 
        show={showModal} 
        onClose={handleModalClose} 
        onSend={handleModalSend}
        appointment={currentAppointment}
        message={message}
        setMessage={setMessage}
      />
    </div>
  );
};

export default ServiceReminder;
