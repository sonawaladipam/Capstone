// AppointmentsModal.js
import React from 'react';
import './appointmentsModal.css';

const AppointmentsModal = ({ isOpen, onClose, appointments }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Appointments</h3>
        <button className="close-button" onClick={onClose}>Close</button>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td>{new Date(appointment.AppointmentDate).toLocaleDateString()}</td>
                <td>{new Date(appointment.AppointmentDate).toLocaleTimeString()}</td>
                <td>{appointment.Description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentsModal;
