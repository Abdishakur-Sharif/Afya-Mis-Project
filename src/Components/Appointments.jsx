import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt, FaCalendarAlt, FaClock, FaUser, FaStethoscope, FaPhoneAlt } from 'react-icons/fa';

// Helper function to convert 24-hour time format to 12-hour time format with AM/PM
const convertTo12HourFormat = (time24h) => {
  let [hours, minutes] = time24h.split(':');
  hours = parseInt(hours);

  const modifier = hours >= 12 ? 'PM' : 'AM';
  if (hours > 12) {
    hours = hours - 12;
  } else if (hours === 0) {
    hours = 12; // Midnight case
  }

  return `${hours}:${minutes} ${modifier}`;
};

// Helper function to convert 12-hour time format to 24-hour time format
const convertTo24HourFormat = (time12h) => {
  const [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':');

  if (modifier === 'PM' && hours !== '12') {
    hours = (parseInt(hours) + 12).toString(); // Convert PM hours to 24-hour format
  }

  if (modifier === 'AM' && hours === '12') {
    hours = '00'; // Convert 12 AM to 00 hours
  }

  // Pad hours and minutes with leading zeros if necessary
  hours = hours.padStart(2, '0');
  minutes = minutes.padStart(2, '0');

  return `${hours}:${minutes}`;
};

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [editAppointment, setEditAppointment] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState('');

  useEffect(() => {
    // Fetch appointments from the Flask API
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          "https://afya-mis-backend-6.onrender.com/appointments"
        );
        if (!response.ok) {
          throw new Error('Failed to fetch appointments');
        }
        const data = await response.json();

        // Convert time to 24-hour format before setting the state
        const updatedAppointments = data.map((appointment) => ({
          ...appointment,
          appointment_time: appointment.appointment_time
            ? convertTo24HourFormat(appointment.appointment_time)
            : '',
        }));

        setAppointments(updatedAppointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  const handleCancel = async (index) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      const appointmentToDelete = appointments[index];
      
      try {
        const response = await fetch(
          `https://afya-mis-backend-6.onrender.com/appointments/${appointmentToDelete.id}`,
          {
            method: "DELETE", // HTTP DELETE request
          }
        );

        if (!response.ok) {
          throw new Error('Failed to cancel appointment');
        }

        // Remove the deleted appointment from the state
        const updatedAppointments = appointments.filter((_, i) => i !== index);
        setAppointments(updatedAppointments);
        setShowSuccessMessage('Appointment canceled successfully!');

        // Clear the success message after 3 seconds
        setTimeout(() => {
          setShowSuccessMessage('');
        }, 3000);
      } catch (error) {
        console.error('Error canceling appointment:', error);
        setShowSuccessMessage('Failed to cancel appointment.');
        
        // Clear the error message after 3 seconds
        setTimeout(() => {
          setShowSuccessMessage('');
        }, 3000);
      }
    }
  };

  const handleUpdate = async (index) => {
    if (!appointmentDate || !appointmentTime) {
      alert("Please fill in both date and time.");
      return;
    }

    const updatedAppointment = appointments[index];

    try {
      // Send a PATCH request to the server to update the appointment date and time
      const response = await fetch(
        `https://afya-mis-backend-6.onrender.com/appointments/${updatedAppointment.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            appointment_date: appointmentDate,
            appointment_time: convertTo24HourFormat(appointmentTime), // Ensure time is sent in 24-hour format
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update appointment');
      }

      // Update the state with the new appointment date and time
      const updatedAppointments = [...appointments];
      updatedAppointments[index] = {
        ...updatedAppointments[index],
        appointment_date: appointmentDate,
        appointment_time: convertTo24HourFormat(appointmentTime), // Store time in 24-hour format
      };
      setAppointments(updatedAppointments);

      setEditAppointment(null);
      setAppointmentDate('');
      setAppointmentTime('');
      setShowSuccessMessage('Appointment rescheduled successfully!');

      // Clear the success message after 3 seconds
      setTimeout(() => {
        setShowSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error updating appointment:', error);
      setShowSuccessMessage('Failed to reschedule appointment.');
      
      // Clear the error message after 3 seconds
      setTimeout(() => {
        setShowSuccessMessage('');
      }, 3000);
    }
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

  const renderUpdateForm = () => (
    <div className="mb-6 p-4 bg-blue-100 border rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Reschedule Appointment</h3>
      <input
        type="date"
        value={appointmentDate}
        onChange={(e) => setAppointmentDate(e.target.value)}
        className="border p-3 w-full mb-4 rounded-md shadow-sm"
      />
      <input
        type="time"
        value={appointmentTime}  // Use the 24-hour format for the input
        onChange={(e) => setAppointmentTime(e.target.value)}
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
                <strong>Patient:</strong> {appointment.patient.name}
              </div>

              {/* Patient's Phone Number and Gender (No Icons, Just Text) */}
              <div className="flex items-center mb-2 text-sm text-gray-600">
                <FaPhoneAlt className="mr-2 text-blue-500" />
                <span>{appointment.patient.phone_number || 'N/A'}</span>
                <span className="mx-4">|</span>
                <strong>Gender:</strong> {appointment.patient.gender || 'N/A'}
              </div>

              <div className="flex items-center mb-2">
                <FaStethoscope className="mr-2 text-blue-500" />
                <strong>Doctor:</strong> {appointment.doctor.name}
              </div>
              <div className="flex items-center text-sm text-gray-600 mt-2">
                <FaCalendarAlt className="mr-2 text-blue-500" />
                <span>{formatDate(appointment.appointment_date)}</span>
                <span className="mx-2">|</span>
                <FaClock className="mr-2 text-blue-500" />
                <span>{convertTo12HourFormat(appointment.appointment_time)}</span>  {/* Convert to 12-hour format */}
              </div>

              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => {
                    setEditAppointment(index);
                    setAppointmentDate(appointment.appointment_date);
                    setAppointmentTime(appointment.appointment_time);
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
