import React from 'react';
import { FaRegUser, FaCalendarAlt, FaFileAlt, FaClipboardList } from 'react-icons/fa'; 

function NavigationBar({ onSelectSection }) {
  return (
    <nav className="lg:w-1/4 min-h-screen bg-blue-600 text-white p-6 space-y-4 flex flex-col">
      <button 
        onClick={() => onSelectSection('register')} 
        className="w-full text-left p-3 rounded-lg text-lg hover:bg-blue-500 focus:outline-none transition duration-300">
        <FaRegUser className="inline mr-2" /> Register Patient
      </button>
      <button 
        onClick={() => onSelectSection('schedule')} 
        className="w-full text-left p-3 rounded-lg text-lg hover:bg-blue-500 focus:outline-none transition duration-300">
        <FaCalendarAlt className="inline mr-2" /> Schedule Appointment
      </button>
      <button 
        onClick={() => onSelectSection('records')} 
        className="w-full text-left p-3 rounded-lg text-lg hover:bg-blue-500 focus:outline-none transition duration-300">
        <FaFileAlt className="inline mr-2" /> Patient Records
      </button>
      <button 
        onClick={() => onSelectSection('appointments')} 
        className="w-full text-left p-3 rounded-lg text-lg hover:bg-blue-500 focus:outline-none transition duration-300">
        <FaClipboardList className="inline mr-2" /> Upcoming Appointments
      </button>
    </nav>
  );
}

export default NavigationBar;
