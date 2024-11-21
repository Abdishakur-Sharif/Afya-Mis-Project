import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from './ReceptionistNavigationBar';
import PatientRegistrationForm from './PatientRegistrationForm';
import AppointmentScheduler from './AppointmentScheduler';
import PatientRecords from './PatientRecords';
import Appointments from './Appointments';

function ReceptionistDashboard() {
  const [selectedSection, setSelectedSection] = useState('register');
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  const handleRegisterPatient = (patient) => {
    setPatients([...patients, patient]);
  };

  const handleLogout = () => {
    // Clear authentication data (if any)
    localStorage.removeItem('authToken'); // Example: removing a token
    sessionStorage.clear(); // Clear any session storage, if used

    // Redirect to the home page
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Navigation bar with logout functionality */}
      <NavigationBar onSelectSection={setSelectedSection} onLogout={handleLogout} />

      <div className="lg:flex-1 p-8 space-y-8 overflow-auto">
        {selectedSection === 'register' && <PatientRegistrationForm onSubmit={handleRegisterPatient} />}
        {selectedSection === 'schedule' && <AppointmentScheduler />}
        {selectedSection === 'records' && <PatientRecords patients={patients} />}
        {selectedSection === 'appointments' && <Appointments />}
      </div>
    </div>
  );
}

export default ReceptionistDashboard;
