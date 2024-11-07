import React, { useEffect, useState } from 'react';

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

  // Render update form if editing an appointment
  const renderUpdateForm = () => {
    return (
      <div className="mb-4">
        <h3>Edit Appointment</h3>
        <input
          type="text"
          placeholder="Patient Name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <input
          type="text"
          placeholder="Doctor Name"
          value={doctorName}
          onChange={(e) => setDoctorName(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <input
          type="datetime-local"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <button
          onClick={() => handleUpdate(editAppointment)}
          className="bg-blue-500 text-white p-2 mt-2"
        >
          Update Appointment
        </button>
      </div>
    );
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-lg font-bold mb-4">Upcoming Appointments</h2>

      {editAppointment !== null && renderUpdateForm()}

      {appointments.length === 0 ? (
        <p>No upcoming appointments.</p>
      ) : (
        <ul>
          {appointments.map((appointment, index) => (
            <li key={index} className="mb-4">
              <div><strong>Patient:</strong> {appointment.patientName}</div>
              <div><strong>Doctor:</strong> {appointment.doctorName}</div>
              <div><strong>Date & Time:</strong> {new Date(appointment.appointmentDate).toLocaleString()}</div>
              <button
                onClick={() => {
                  setEditAppointment(index);
                  setPatientName(appointment.patientName);
                  setDoctorName(appointment.doctorName);
                  setAppointmentDate(appointment.appointmentDate);
                }}
                className="bg-yellow-500 text-white p-2 mt-2 mr-2"
              >
                Update
              </button>
              <button
                onClick={() => handleCancel(index)}
                className="bg-red-500 text-white p-2 mt-2"
              >
                Cancel
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UpcomingAppointments;
