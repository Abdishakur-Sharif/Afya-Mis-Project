import React from 'react';

function AppointmentScheduler() {
  return (
    <div className="p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Schedule Appointment</h2>
      <input 
        type="text" 
        placeholder="Patient Name" 
        className="border p-4 mb-4 w-full rounded-lg focus:ring-2 focus:ring-blue-500" 
      />
      <input 
        type="text" 
        placeholder="Doctor" 
        className="border p-4 mb-4 w-full rounded-lg focus:ring-2 focus:ring-blue-500" 
      />
      <input 
        type="datetime-local" 
        className="border p-4 mb-6 w-full rounded-lg focus:ring-2 focus:ring-blue-500" 
      />
      <button 
        className="bg-blue-500 text-white p-4 w-full rounded-lg hover:bg-blue-600 transition duration-300">
        Schedule
      </button>
    </div>
  );
}

export default AppointmentScheduler;
