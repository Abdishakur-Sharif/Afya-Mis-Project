import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt, FaCalendarAlt, FaClock, FaUser, FaStethoscope } from 'react-icons/fa';

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [editAppointment, setEditAppointment] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState('');

  useEffect(() => {
    const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    setAppointments(storedAppointments);
  }, []);

  const handleCancel = (index) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      const updatedAppointments = appointments.filter((_, i) => i !== index);
      setAppointments(updatedAppointments);
      localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
      setShowSuccessMessage("Appointment canceled successfully!");
    }
  };

  const handleUpdate = (index) => {
    const updatedAppointments = [...appointments];
    updatedAppointments[index] = {
      ...updatedAppointments[index],
      appointmentDate,
    };
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));

    setEditAppointment(null);
    setAppointmentDate('');
    setShowSuccessMessage("Appointment rescheduled successfully!");
  };

  const formatDate = (date) => {
    const appointment = new Date(date);
    return appointment.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (date) => {
    const appointment = new Date(date);
    return appointment.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderUpdateForm = () => (
    <div className="mb-6 p-4 bg-blue-100 border rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Reschedule Appointment</h3>
      <input
        type="datetime-local"
        value={appointmentDate}
        onChange={(e) => setAppointmentDate(e.target.value)}
        className="border p-3 w-full mb-4 rounded-md shadow-sm"
      />
      <button
        onClick={() => handleUpdate(editAppointment)}
        className="bg-green-500 text-white p-3 rounded-md hover:bg-green-600 transition-all"
      >
        Update Date & Time
      </button>
    </div>
  );

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Manage Appointments</h2>

      {showSuccessMessage && (
        <div className="bg-green-100 text-green-800 p-3 rounded-lg mb-4">
          {showSuccessMessage}
        </div>
      )}

      {editAppointment !== null && renderUpdateForm()}

      {appointments.length === 0 ? (
        <p className="text-lg text-gray-500">No upcoming appointments.</p>
      ) : (
        <ul className="space-y-6">
          {appointments.map((appointment, index) => (
            <li key={index} className="p-4 bg-gray-50 border rounded-lg shadow-md transition-transform transform hover:scale-105">
              <div className="flex items-center mb-2">
                <FaUser className="mr-2 text-blue-500" />
                <strong>Patient:</strong> {appointment.patientName}
              </div>
              <div className="flex items-center mb-2">
                <FaStethoscope className="mr-2 text-blue-500" />
                <strong>Doctor:</strong> {appointment.doctorName}
              </div>
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
                    setAppointmentDate(appointment.appointmentDate);
                  }}
                  className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 transition-all flex items-center"
                >
                  <FaEdit className="mr-2" /> Reschedule
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

export default Appointments;
