import React, { useState, useEffect } from 'react';

// Helper function to convert 12-hour time (with AM/PM) to 24-hour time format
const convertTo24HourFormat = (time12h) => {
  let [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':');
  hours = parseInt(hours);

  // Convert hours based on AM/PM modifier
  if (modifier === 'AM' && hours === 12) {
    hours = 0; // Midnight case
  } else if (modifier === 'PM' && hours !== 12) {
    hours = hours + 12; // Convert PM hour
  }

  // Pad hours and minutes to ensure two digits (HH:MM format)
  return `${hours.toString().padStart(2, '0')}:${minutes}`;
};

function AppointmentScheduler() {
  const [patientName, setPatientName] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [patients, setPatients] = useState([]); // List of patients (you can fetch from API)
  const [doctors, setDoctors] = useState([]); // List of doctors
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [successMessage, setSuccessMessage] = useState(''); // State to hold success message

  useEffect(() => {
    // Fetch doctors from the API to populate the dropdown
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5555/doctors');
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    // Fetch patients from an API (replace with actual endpoint)
    const fetchPatients = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5555/patients');
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchDoctors();
    fetchPatients();
  }, []);

  // Filter patients based on the search term
  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle form submission for scheduling
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!selectedPatient || !selectedDoctorId || !appointmentDate || !appointmentTime) {
      alert('Please fill in all fields');
      return;
    }

    // Convert time to 24-hour format before sending to backend
    const appointmentTime24h = convertTo24HourFormat(appointmentTime);

    // Create the appointment object to send to the backend
    const newAppointment = {
      patient_id: selectedPatient.id,
      doctor_id: selectedDoctorId,
      appointment_date: appointmentDate,
      appointment_time: appointmentTime24h,  // Now sending in 24-hour format
    };

    // Send POST request to create the appointment
    try {
      const response = await fetch('http://127.0.0.1:5555/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAppointment),
      });

      if (!response.ok) {
        throw new Error('Failed to schedule appointment');
      }

      const data = await response.json();

      // Set success message
      setSuccessMessage('Appointment scheduled successfully!');

      // Reset form fields
      setPatientName('');
      setDoctorName('');
      setAppointmentDate('');
      setAppointmentTime('');
      setSelectedPatient(null);
      setSelectedDoctorId(null);
      setSearchTerm('');

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);  // Hide message after 3 seconds

    } catch (error) {
      console.error('Error scheduling appointment:', error);
      alert('Failed to schedule appointment.');
    }
  };

  return (
    <div className="p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Schedule Appointment</h2>
      <form onSubmit={handleSubmit}>
        {/* Patient Search */}
        <input
          type="text"
          placeholder="Search Patient Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-4 mb-4 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <div className="mb-4">
          {filteredPatients.length > 0 && (
            <ul className="max-h-40 overflow-y-auto border p-2 rounded-lg">
              {filteredPatients.map((patient) => (
                <li
                  key={patient.id}
                  onClick={() => {
                    setSelectedPatient(patient);
                    setPatientName(patient.name);
                    setSearchTerm('');
                  }}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                >
                  {patient.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Selected Patient Name */}
        <input
          type="text"
          value={patientName}
          readOnly
          className="border p-4 mb-4 w-full rounded-lg bg-gray-100"
        />

        {/* Doctor Dropdown */}
        <select
          value={selectedDoctorId}
          onChange={(e) => setSelectedDoctorId(e.target.value)}
          className="border p-4 mb-4 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.name}
            </option>
          ))}
        </select>

        {/* Appointment Date and Time */}
        <input
          type="date"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
          className="border p-4 mb-4 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="time"
          value={appointmentTime}
          onChange={(e) => setAppointmentTime(e.target.value)}
          className="border p-4 mb-6 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white p-4 w-full rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Schedule Appointment
        </button>
      </form>

      {/* Success Message */}
      {successMessage && (
        <div className="mt-4 text-green-500 text-center">
          {successMessage}
        </div>
      )}
    </div>
  );
}

export default AppointmentScheduler;
