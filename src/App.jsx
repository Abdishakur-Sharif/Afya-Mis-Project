// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminAuth from './components/AdminAuth';
import AdminDashboard from './components/AdminDashboard';
import AddPatientForm from './components/AddPatientForm';
import AddDoctorForm from './components/AddDoctorForm';
import AddNurseForm from './components/AddNurseForm';
import AddStaffForm from './components/AddStaffForm';
// import DoctorsList from 'pages/DoctorsList';
// import PatientsList from 'pages/PatientsList';
// import NursesList from 'pages/NursesList';
// import StaffList from 'pages/StaffList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminAuth />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/add-patient" element={<AddPatientForm />} />
        <Route path="/add-doctor" element={<AddDoctorForm />} />
        <Route path="/add-nurse" element={<AddNurseForm />} />
        <Route path="/add-staff" element={<AddStaffForm />} />
        {/* <Route path="/doctors" element={<DoctorsList />} /> */}
        {/* <Route path="/patients" element={<PatientsList />} /> */}
        {/* <Route path="/nurses" element={<NursesList />} /> */}
        {/* <Route path="/staff" element={<StaffList />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
