import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">Admin Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Doctors Management */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
          <h3 className="text-xl font-semibold text-blue-600 mb-4">Manage Doctors</h3>
          <p className="text-gray-700 mb-4">View, add, or remove doctors in the system.</p>
          <Link
            to="/doctors"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Manage Doctors
          </Link>
        </div>

        {/* Nurses Management */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
          <h3 className="text-xl font-semibold text-blue-600 mb-4">Manage Nurses</h3>
          <p className="text-gray-700 mb-4">View, add, or remove nurses in the system.</p>
          <Link
            to="/nurses"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Manage Nurses
          </Link>
        </div>

        {/* Staff Management */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
          <h3 className="text-xl font-semibold text-blue-600 mb-4">Manage Staff</h3>
          <p className="text-gray-700 mb-4">View, add, or remove staff members in the system.</p>
          <Link
            to="/staff"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Manage Staff
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
