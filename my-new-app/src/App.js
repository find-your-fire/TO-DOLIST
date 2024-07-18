import React from 'react';
import './App.css';
import ReminderForm from './ReminderForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Set Reminders</h1>
        <ReminderForm />
      </header>
    </div>
  );
}

export default App;