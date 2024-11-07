import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt, FaCalendarAlt, FaClock } from 'react-icons/fa'; // Optional icons for date and time

function UpcomingAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [editAppointment, setEditAppointment] = useState(null);
  const [patientName, setPatientName] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');

  useEffect(() => {
    // Fetch appointments from localStorage when the component mounts
    const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    setAppointments(storedAppointments);
  }, []);

  // Handle canceling an appointment
  const handleCancel = (index) => {
    const updatedAppointments = appointments.filter((_, i) => i !== index);
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments)); // update localStorage immediately
  };

  // Handle updating an appointment
  const handleUpdate = (index) => {
    const updatedAppointments = [...appointments];
    updatedAppointments[index] = {
      patientName,
      doctorName,
      appointmentDate,
    };
    setAppointments(updatedAppointments); // update the state immediately
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments)); // update localStorage immediately

    // Reset edit state
    setEditAppointment(null);
    setPatientName('');
    setDoctorName('');
    setAppointmentDate('');
  };

  // Format date to display in a more readable way
  const formatDate = (date) => {
    const appointment = new Date(date);
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return appointment.toLocaleDateString(undefined, options);
  };

  const formatTime = (date) => {
    const appointment = new Date(date);
    return appointment.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Render update form if editing an appointment
  const renderUpdateForm = () => {
    return (
      <div className="mb-6 p-4 bg-gray-100 border rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Edit Appointment</h3>
        <input
          type="text"
          placeholder="Patient Name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          className="border p-3 w-full mb-4 rounded-md shadow-sm"
        />
        <input
          type="text"
          placeholder="Doctor Name"
          value={doctorName}
          onChange={(e) => setDoctorName(e.target.value)}
          className="border p-3 w-full mb-4 rounded-md shadow-sm"
        />
        <input
          type="datetime-local"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
          className="border p-3 w-full mb-4 rounded-md shadow-sm"
        />
        <button
          onClick={() => handleUpdate(editAppointment)}
          className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition-all"
        >
          Update Appointment
        </button>
      </div>
    );
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Upcoming Appointments</h2>

      {editAppointment !== null && renderUpdateForm()}

      {appointments.length === 0 ? (
        <p className="text-lg text-gray-500">No upcoming appointments.</p>
      ) : (
        <ul className="space-y-6">
          {appointments.map((appointment, index) => (
            <li key={index} className="p-4 bg-gray-50 border rounded-lg shadow-md">
              <div><strong>Patient:</strong> {appointment.patientName}</div>
              <div><strong>Doctor:</strong> {appointment.doctorName}</div>
              <div className="flex items-center text-sm text-gray-600 mt-2">
                <FaCalendarAlt className="mr-2 text-blue-500" />
                <span>{formatDate(appointment.appointmentDate)}</span>
                <span className="mx-2">|</span>
                <FaClock className="mr-2 text-blue-500" />
                <span>{formatTime(appointment.appointmentDate)}</span>
              </div>
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => {
                    setEditAppointment(index);
                    setPatientName(appointment.patientName);
                    setDoctorName(appointment.doctorName);
                    setAppointmentDate(appointment.appointmentDate);
                  }}
                  className="bg-yellow-400 text-white p-2 rounded-md hover:bg-yellow-500 transition-all flex items-center"
                >
                  <FaEdit className="mr-2" /> Update
                </button>
                <button
                  onClick={() => handleCancel(index)}
                  className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-all flex items-center"
                >
                  <FaTrashAlt className="mr-2" /> Cancel
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UpcomingAppointments;
