import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making API requests

const StaffList = () => {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state

  useEffect(() => {
    const fetchStaffs = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5555/staffs'); // Fetch from API
        setStaffList(response.data);
      } catch (err) {
        setError("Failed to fetch staff members.");
      } finally {
        setLoading(false);
      }
    };

    fetchStaffs();
  }, []);

  // Remove staff function
  const removeStaff = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this staff member?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://127.0.0.1:5555/staffs/${id}`); // Call the API to delete
      setStaffList(staffList.filter((staff) => staff.id !== id)); // Update local state
    } catch (err) {
      setError("Failed to delete staff member.");
    }
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
      <br />

      {/* Button to Navigate to Add Staff Form */}
      <Link
        to="/addstaffs"
        className="mb-6 inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Add New Staff
      </Link>

      {/* Display loading state */}
      {loading ? (
        <div className="text-center text-blue-700">Loading staff members...</div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : (
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full bg-white rounded-lg shadow-md border border-gray-200">
            <thead>
              <tr className="bg-blue-600 text-white text-left">
                <th className="py-3 px-4 border-r border-gray-300 font-semibold">Name</th>
                <th className="py-3 px-4 border-r border-gray-300 font-semibold">Department</th>
                <th className="py-3 px-4 border-r border-gray-300 font-semibold">Contact</th>
                <th className="py-3 px-4 border-r border-gray-300 font-semibold">Email</th>
                {/* <th className="py-3 px-4 font-semibold">Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {staffList.length > 0 ? (
                staffList.map((staff) => (
                  <tr key={staff.id} className="border-b last:border-none hover:bg-blue-100">
                    <td className="py-3 px-4 border-r border-gray-300 text-blue-700">{staff.name}</td>
                    <td className=" py-3 px-4 border-r border-gray-300">{staff.role}</td>
                    <td className="py-3 px-4 border-r border-gray-300">{staff.phone_number}</td>
                    <td className="py-3 px-4 border-r border-gray-300">{staff.email}</td>
                    {/* <td className="py-3 px-4">
                      <button
                        onClick={() => removeStaff(staff.id)}
                        className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition-colors"
                      >
                        Remove
                      </button>
                    </td> */}
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
      )}
    </div>
  );
};

export default StaffList;