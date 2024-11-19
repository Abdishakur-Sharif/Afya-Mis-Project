// StaffList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const StaffList = () => {
  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    const storedStaffs = localStorage.getItem('staffs');
    if (storedStaffs) {
      setStaffList(JSON.parse(storedStaffs));
    }
  }, []);

  // Remove staff function
  const removeStaff = (id) => {
    const updatedStaffs = staffList.filter((staff) => staff.id !== id);
    setStaffList(updatedStaffs);
    localStorage.setItem('staffs', JSON.stringify(updatedStaffs));
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">Staff List</h2>

      {/* Button to Navigate to Admin Dashboard */}
      <Link
        to="/admindashboard"
        className="mb-6 inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Admin Dashboard
      </Link>
      <br></br>

      {/* Button to Navigate to Add Staff Form */}
      <Link
        to="/addstaffs"
        className="mb-6 inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Add New Staff
      </Link>

      {/* Staff List Table */}
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white rounded-lg shadow-md border border-gray-200">
          <thead>
            <tr className="bg-blue-600 text-white text-left">
              <th className="py-3 px-4 border-r border-gray-300 font-semibold">
                Name
              </th>
              <th className="py-3 px-4 border-r border-gray-300 font-semibold">
                Department
              </th>
              <th className="py-3 px-4 border-r border-gray-300 font-semibold">
                Contact
              </th>
              <th className="py-3 px-4 border-r border-gray-300 font-semibold">
                Email
              </th>
              <th className="py-3 px-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {staffList.length > 0 ? (
              staffList.map((staff) => (
                <tr
                  key={staff.id}
                  className="border-b last:border-none hover:bg-blue-100"
                >
                  <td className="py-3 px-4 border-r border-gray-300 text-blue-700">
                    {staff.name}
                  </td>
                  <td className="py-3 px-4 border-r border-gray-300">
                    {staff.department}
                  </td>
                  <td className="py-3 px-4 border-r border-gray-300">
                    {staff.contact}
                  </td>
                  <td className="py-3 px-4 border-r border-gray-300">
                    {staff.email}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => removeStaff(staff.id)}
                      className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 text-center text-blue-700">
                  No staff members available. Please add a new staff member.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffList;
