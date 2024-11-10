// src/components/AdminDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  return (
    <div className="p-6 bg-secondary min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-primary">Admin Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <Link to="/add-patient" className="p-4 bg-primary text-white rounded">Add Patient</Link>
        <Link to="/add-doctor" className="p-4 bg-primary text-white rounded">Add Doctor</Link>
        <Link to="/add-nurse" className="p-4 bg-primary text-white rounded">Add Nurse</Link>
        <Link to="/add-staff" className="p-4 bg-primary text-white rounded">Add Staff</Link>
        <Link to="/patients" className="p-4 bg-primary text-white rounded">View Patients</Link>
        <Link to="/doctors" className="p-4 bg-primary text-white rounded">View Doctors</Link>
        <Link to="/nurses" className="p-4 bg-primary text-white rounded">View Nurses</Link>
        <Link to="/staff" className="p-4 bg-primary text-white rounded">View Staff</Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
