// src/App.js
import React from 'react';
import ReceptionistDashboard from './Componets/ReceptionistDashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ForgotPassword from './Componets/ForgotPassword';
import Login from './Componets/LogIn';
import Registration from './Componets/Registration';
import Doctordashboard from './Componets/Doctordashboard';
import LabReportForm from './Componets/LabReportForm';
import Report from './Components/Report';


function App() {
  // ;

  return (
    <div>
        
        <Routes>
          <Route path='/doctordashboard' element={<Doctordashboard />} />
          <Route path='/labreportform' element={<LabReportForm />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/receptionist-dashboard" element={<ReceptionistDashboard />} />
          <Route path="/report" element={<Report />} />
        </Routes>
    
      
    </div>
  );;

}

export default App;
