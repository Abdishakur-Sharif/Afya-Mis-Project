// src/App.js
import React from 'react';
import ReceptionistDashboard from './Componets/ReceptionistDashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ForgotPassword from './Componets/ForgotPassword';
import Login from './Componets/LogIn';
import Registration from './Componets/Registration';
import PharmarcyDashboard from './Componets/PharmarcyDashBoard';

function App() {
  

  return (
    <>
      
        <Routes>
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/receptionist-dashboard" element={<ReceptionistDashboard />} />
          <Route path='/pharmarcy' element={<PharmarcyDashboard />} />
        </Routes>
    </>
  );
}

export default App;
