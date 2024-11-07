import React, { useState } from 'react';

function AppointmentScheduler({ onNewAppointment }) {
  const [patientName, setPatientName] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!patientName || !doctorName || !appointmentDate) {
      alert('Please fill in all fields');
      return;
    }

    // Create new appointment object
    const newAppointment = { patientName, doctorName, appointmentDate };

    // Pass new appointment data to parent component
    onNewAppointment(newAppointment);

    // Clear form fields
    setPatientName('');
    setDoctorName('');
    setAppointmentDate('');
  };

  return (
    <div className="p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Schedule Appointment</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Patient Name" 
          value={patientName} 
          onChange={(e) => setPatientName(e.target.value)} 
          className="border p-4 mb-4 w-full rounded-lg focus:ring-2 focus:ring-blue-500" 
        />
        <input 
          type="text" 
          placeholder="Doctor" 
          value={doctorName} 
          onChange={(e) => setDoctorName(e.target.value)} 
          className="border p-4 mb-4 w-full rounded-lg focus:ring-2 focus:ring-blue-500" 
        />
        <input 
          type="datetime-local" 
          value={appointmentDate} 
          onChange={(e) => setAppointmentDate(e.target.value)} 
          className="border p-4 mb-6 w-full rounded-lg focus:ring-2 focus:ring-blue-500" 
        />
        <button 
          type="submit"
          className="bg-blue-500 text-white p-4 w-full rounded-lg hover:bg-blue-600 transition duration-300">
          Schedule
        </button>
      </form>
    </div>
  );
}

export default AppointmentScheduler;
