import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ForgotPassword from './Componets/ForgotPassword';
import Login from './Componets/LogIn';
import Registration from './Componets/Registration';
import Patient from './Componets/patients';
import TestRequestsPage from './Componets/testrequest';

function App() {

  return (
    <>
        <Routes>
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/patients" element={<Patient/>} />
          <Route path="/testrequests" element={<TestRequestsPage/>} />
        </Routes>
    </>
  )
}

export default App
