import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authcontext';
import ReceptionistDashboard from './Components/ReceptionistDashboard';
import ForgotPassword from './Components/ForgotPassword';
import Login from './Components/LogIn';
import Registration from './Components/Registration';
import Doctordashboard from './Components/Doctordashboard';
import LabReportForm from './Components/LabReportForm';
import Appointments from './Components/Appointments';
// import ProtectedRoute from './context/ProtectedRoute';
import Patient from './Components/Patients';
import TestRequestsPage from './Components/Testrequest';
import AdminDashboard from './Components/AdminDashboard';
import AddDoctorForm from './Components/AddDoctorForm';
import DoctorList from './Components/DoctorList';
import AddStaffForm from './Components/AddStaffForm';
import LabTechList from './Components/LabTechList';
import AddLabTechForm from './Components/AddLabTechForm';
import StaffList from './Components/StaffList';
import Hero from './Components/Hero';
import Services from './Components/Services';
import About from './Components/About';
import Contact from './Components/Contact';
import Footer from './Components/Footer';
import Payment from './Components/Payment';
import AddTestRequest from './Components/AddTestRequest';
import './index.css';
import TestAlertButton from './Components/TestAlertButton';
import DoctorAlert from './Components/DoctorAlert';
function App() {
  return (
    <AuthProvider>
      {" "}
      {/* Wrap the entire app in AuthProvider to provide context */}
      <>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/labtechs" element={<LabTechList />} />
          <Route path="/addlabtechs" element={<AddLabTechForm />} />
          <Route path="/payment/:patientId" element={<Payment />} />
          <Route path="/addtestrequest" element={<AddTestRequest />} />

          {/* alert route */}

          <Route path="/doctorsalerts" element={<DoctorAlert />} />
          <Route path="/testalertbutton" element={<TestAlertButton />} />
          {/* Protected Routes (Role-Based) */}
           <Route path="/doctordashboard" element={<Doctordashboard />} />
          <Route path="/labreportform" element={<LabReportForm />} />
          <Route
            path="/receptionist-dashboard"
            element={<ReceptionistDashboard />}
          />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/doctorsalert" element={<DoctorAlert />} />
         

          {/* Default Route */}
          {/* <Route path="/" element={<h1>welcome to homepage</h1>} /> */}
          <Route path="/patients" element={<Patient />} />
          <Route path="/lab-dashboard" element={<TestRequestsPage />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/doctors" element={<DoctorList />} />
          <Route path="/adddoctors" element={<AddDoctorForm />} />
          <Route path="/staffs" element={<StaffList />} />
          <Route path="/addstaffs" element={<AddStaffForm />} />
          <Route
            path="/"
            element={
              <>
                <Hero />
                <About />
                <Services />
                <Contact />
                <Footer />
              </>
            }
          />
        </Routes>
      </>
    </AuthProvider>
  );
}

export default App;

