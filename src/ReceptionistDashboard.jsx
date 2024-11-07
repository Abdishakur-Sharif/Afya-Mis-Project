import React, { useState } from 'react';
import NavigationBar from './ReceptionistNavigationBar';
import PatientRegistrationForm from './PatientRegistrationForm';
import AppointmentScheduler from './AppointmentScheduler';
import PatientRecords from './PatientRecords';
import UpcomingAppointments from './UpcomingAppointments';

function ReceptionistDashboard() {
  const [selectedSection, setSelectedSection] = useState('register');
  const [patients, setPatients] = useState([]);

  const handleRegisterPatient = (patient) => {
    setPatients([...patients, patient]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <NavigationBar onSelectSection={setSelectedSection} />

      <div className="lg:flex-1 p-8 space-y-8 overflow-auto">
        {selectedSection === 'register' && <PatientRegistrationForm onSubmit={handleRegisterPatient} />}
        {selectedSection === 'schedule' && <AppointmentScheduler />}
        {selectedSection === 'records' && <PatientRecords patients={patients} />}
        {selectedSection === 'appointments' && <UpcomingAppointments />}
      </div>
    </div>
  );
}

export default ReceptionistDashboard;
