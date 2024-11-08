// src/App.js
import React from 'react';
import ReceptionistDashboard from './Components/ReceptionistDashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ForgotPassword from './Componets/ForgotPassword';
import Login from './Componets/LogIn';
import Registration from './Componets/Registration';

function App() {
  

  return (
    <>
      
        <Routes>
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/receptionist-dashboard" element={<ReceptionistDashboard />} />
        </Routes>
    </>
  );
}

export default App;
