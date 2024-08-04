// src/comp/Modal.js
import React from 'react';
import './Modal.css'; // Create this CSS file for styling

const Modal = ({ show, onClose, onSend, appointment, message, setMessage }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Send Reminder for {appointment.name}</h2>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows="5"
          cols="50"
        />
        <div className="modal-buttons">
          <button onClick={onSend}>Send</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
