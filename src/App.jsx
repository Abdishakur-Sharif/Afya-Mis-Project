import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authcontext';
import ReceptionistDashboard from './Components/ReceptionistDashboard';
import ForgotPassword from './Components/ForgotPassword';
import Login from './Components/LogIn';
import Registration from './Components/Registration';
import Doctordashboard from './Components/Doctordashboard';
import LabReportForm from './Components/LabReportForm';
import Report from './Componets/Report';
import Appointments from './Components/Appointments';
import PatientRecords from './Components/PatientRecords';
// import ProtectedRoute from './context/ProtectedRoute';
import Patient from './Componets/patients';
import TestRequestsPage from './Components/testrequest';
import AdminDashboard from './Components/AdminDashboard';
import AddDoctorForm from './Components/AddDoctorForm';
import AddDoctorList from './Components/AddDoctorList';
import AddNurseForm from './Components/AddNurseForm';
import AddNurseList from './Components/AddNurseList';
import AddStaffForm from './Components/AddStaffForm';
import AddStaffList from './Components/AddStaffList';

function App() {
  return (
    <AuthProvider> {/* Wrap the entire app in AuthProvider to provide context */}
      <>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected Routes (Role-Based) */}
          <Route
            path="/doctordashboard"
            element={<Doctordashboard />}
          />
          <Route
            path="/labreportform"
            element={<LabReportForm />}
          />
          <Route
            path="/receptionist-dashboard"
            element={<ReceptionistDashboard />}
          />
          <Route
            path="/appointments"
            element={<Appointments />}
          />
          <Route
            path="/patientrecords"
            element={<PatientRecords />}
          />
          <Route path="/report" element={<Report />} />

          {/* Default Route */}
          <Route path="/" element={<h1>Welcome to the Hospital Management System</h1>} />
          <Route path="/patients" element={<Patient/>} />
          <Route path="/testrequests" element={<TestRequestsPage/>} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/doctors" element={<AddDoctorList />} />
          <Route path="/doctors/add" element={<AddDoctorForm />} />
          <Route path="/nurses" element={<AddNurseList />} />
          <Route path="/nurses/add" element={<AddNurseForm />} />
          <Route path="/staffs" element={<AddStaffList />} />
          <Route path="/staffs/add" element={<AddStaffForm />} />
        </Routes>
      </>
    </AuthProvider>
  );
}




export default App;

