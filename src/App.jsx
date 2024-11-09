import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ForgotPassword from './Componets/ForgotPassword';
import Login from './Componets/LogIn';
import Registration from './Componets/Registration';
import Doctordashboard from './Componets/Doctordashboard';
import LabReportForm from './Componets/LabReportForm';

function App() {

  return (
    <>
        <Routes>
          <Route path='/doctordashboard' element={<Doctordashboard />} />
          <Route path='/labreportform' element={<LabReportForm />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
    </>
  )
}

export default App
