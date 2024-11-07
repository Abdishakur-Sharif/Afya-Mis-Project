import React from 'react';

function NavigationBar({ onSelectSection }) {
  return (
    <nav className="lg:w-1/4 min-h-screen bg-blue-600 text-white p-6 space-y-4 flex flex-col">
      <button 
        onClick={() => onSelectSection('register')} 
        className="w-full text-left p-3 rounded-lg text-lg hover:bg-blue-500 focus:outline-none transition duration-300">
        Register Patient
      </button>
      <button 
        onClick={() => onSelectSection('schedule')} 
        className="w-full text-left p-3 rounded-lg text-lg hover:bg-blue-500 focus:outline-none transition duration-300">
        Schedule Appointment
      </button>
      <button 
        onClick={() => onSelectSection('records')} 
        className="w-full text-left p-3 rounded-lg text-lg hover:bg-blue-500 focus:outline-none transition duration-300">
        Patient Records
      </button>
      <button 
        onClick={() => onSelectSection('appointments')} 
        className="w-full text-left p-3 rounded-lg text-lg hover:bg-blue-500 focus:outline-none transition duration-300">
        Upcoming Appointments
      </button>
    </nav>
  );
}

export default NavigationBar;
