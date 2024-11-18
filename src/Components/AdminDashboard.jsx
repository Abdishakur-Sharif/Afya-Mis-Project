import React from "react";
import { Link } from "react-router-dom";
const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <h2 className="text-3xl font-bold text-blue-700 mb-8">Admin Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Doctors Management */}
        <div className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow transform hover:scale-105">
          <h3 className="text-2xl font-semibold text-blue-700 mb-4">
            Manage Doctors
          </h3>
          <p className="text-gray-600 mb-6">
            View, add, or remove doctors in the system. Keep track of their
            details .
          </p>
          <Link
            to="/doctors"
            className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors ease-in-out duration-200"
          >
            Manage Doctors
          </Link>
        </div>
        {/* LabTech Management */}
        <div className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow transform hover:scale-105">
          <h3 className="text-2xl font-semibold text-blue-700 mb-4">
            Manage LabTech
          </h3>
          <p className="text-gray-600 mb-6">
            View, add, or remove LabTech in the system. Keep track of their
            details .
          </p>
          <Link
            to="/labtechs"
            className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors ease-in-out duration-200"
          >
            Manage LabTechs
          </Link>
        </div>
        {/* Staff Management */}
        <div className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow transform hover:scale-105">
          <h3 className="text-2xl font-semibold text-blue-700 mb-4">
            Manage Staff
          </h3>
          <p className="text-gray-600 mb-6">
            View, add, or remove staff members. Manage your team effectively to
            improve operations.
          </p>
          <Link
            to="/staffs"
            className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors ease-in-out duration-200"
          >
            Manage Staff
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow transform hover:scale-105">
          <h3 className="text-2xl font-semibold text-blue-700 mb-4">
            User Management
          </h3>
          <p className="text-gray-600 mb-6">
            Manage roles, permissions, and user accounts for a secure and
            compliant system.
          </p>
          <Link
            to="/registration"
            className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors ease-in-out duration-200"
          >
            Manage Users
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow transform hover:scale-105">
          <h3 className="text-2xl font-semibold text-blue-700 mb-4">
            Patient Management
          </h3>
          <p className="text-gray-600 mb-6">
            Manage patient records, appointments, and medical history.
          </p>
          <Link
            to="/patients"
            className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors ease-in-out duration-200"
          >
            Manage Patients
          </Link>
        </div>    
      </div>
    </div>
  );
};

export default AdminDashboard;
