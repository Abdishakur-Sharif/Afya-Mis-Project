<<<<<<< HEAD
// src/App.jsx
import React from 'react';
import { Box } from '@mui/material';
import Header from './Components/Header';
import Hero from './Components/Hero';
import Services from './Components/Services';
import About from './Components/About';
import Contact from './Components/Contact';
import Footer from './Components/Footer';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        
        <Box sx={{ flexGrow: 1 }}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <Services />
                  <About />
                  <Contact />
                </>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Box>
        
        <Footer />
      </Box>
    </Router>
  );
}

export default App;
=======
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

>>>>>>> 973b3f4d96a8f8727adedea95104afdf8136e2e0
