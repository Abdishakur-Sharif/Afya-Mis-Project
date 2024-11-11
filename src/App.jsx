import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './Components/AdminDashboard';
import AddDoctorForm from './Components/AddDoctorForm';
import AddDoctorList from './Components/AddDoctorList';
import AddNurseForm from './Components/AddNurseForm';
import AddNurseList from './Components/AddNurseList';
import AddStaffForm from './Components/AddStaffForm';
import AddStaffList from './Components/AddStaffList';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-blue-50">
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/doctors" element={<AddDoctorList />} />
          <Route path="/doctors/add" element={<AddDoctorForm />} />
          <Route path="/nurses" element={<AddNurseList />} />
          <Route path="/nurses/add" element={<AddNurseForm />} />
          <Route path="/staffs" element={<AddStaffList />} />
          <Route path="/staffs/add" element={<AddStaffForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

