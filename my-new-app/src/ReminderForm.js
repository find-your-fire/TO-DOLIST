import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format, isBefore } from 'date-fns';
import './ReminderForm.css'; // Import the CSS file

const ReminderForm = () => {
  const [reminders, setReminders] = useState([]);
  const [medicine, setMedicine] = useState('');
  const [time, setTime] = useState('');

  const handleAddReminder = (e) => {
    e.preventDefault();
    const reminder = {
      id: new Date().getTime(),
      medicine,
      time,
    };
    setReminders([...reminders, reminder]);
    setMedicine('');
    setTime('');
  };

  const handleDeleteReminder = (id) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      reminders.forEach((reminder) => {
        const reminderTime = new Date(reminder.time);
        if (isBefore(reminderTime, now)) {
          toast(`REMINDER: ${reminder.medicine}`);
          setReminders((prevReminders) =>
            prevReminders.filter((r) => r.id !== reminder.id)
          );
        }
      });
    }, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [reminders]);

  return (
    <div className="reminder-form">
      <form onSubmit={handleAddReminder}>
        <div className="form-group">
          <label>Add a Task:</label>
          <input
            type="text"
            value={medicine}
            onChange={(e) => setMedicine(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Reminder Time:</label>
          <input
            type="datetime-local"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <button type="submit" className="btn">Add Reminder</button>
      </form>
      <ToastContainer />
      <div className="reminder-list">
        <h3>Upcoming Reminders</h3>
        <ul>
          {reminders.map((reminder) => (
            <li key={reminder.id} className="reminder-item">
              <span>{reminder.medicine} at {format(new Date(reminder.time), 'Pp')}</span>
              <button onClick={() => handleDeleteReminder(reminder.id)} className="delete-btn">
                <i className="fas fa-trash"></i>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReminderForm;

