import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DoctorList = () => {
  const [doctorList, setDoctorList] = useState([]);

  // Function to fetch doctors from the backend
  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5555/doctors'); // Adjust the URL as necessary
      setDoctorList(response.data); // Set the state with the fetched data
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  useEffect(() => {
    fetchDoctors(); // Fetch doctors when the component mounts
  }, []);

  // Remove doctor function
  const removeDoctor = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5555/doctors/${id}`); // Adjust the URL as necessary
      setDoctorList(doctorList.filter((doctor) => doctor.id !== id)); // Update state to remove the doctor locally
    } catch (error) {
      console.error('Error removing doctor:', error);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">Doctor List</h2>
      
      {/* Button to Navigate to Admin Dashboard */}
      <Link to="/admindashboard" className="mb-6 inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
        Admin Dashboard
      </Link>
      <br />
      {/* Button to Navigate to Add Doctor Form */}
      <Link to="/adddoctors" className="mb-6 inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
        Add New Doctor
      </Link>

      {/* Doctor List Table */}
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white rounded-lg shadow-md border border-gray-200">
          <thead>
            <tr className="bg-blue-600 text-white text-left">
              <th className="py-3 px-4 border-r border-gray-300 font-semibold">Name</th>
              <th className="py-3 px-4 border-r border-gray-300 font-semibold">Specialization</th>
              <th className="py-3 px-4 border-r border-gray-300 font-semibold">Contact</th>
              <th className="py-3 px-4 border-r border-gray-300 font-semibold">Email</th>
              <th className="py-3 px-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctorList.length > 0 ? (
              doctorList.map((doctor) => (
                <tr key={doctor.id} className="border-b last:border-none hover:bg-blue-100">
                  <td className="py-3 px-4 border-r border-gray-300 text-blue-700">{doctor.name}</td>
                  <td className="py-3 px-4 border-r border-gray-300">{doctor.speciality}</td>
                  <td className="py-3 px-4 border-r border-gray-300">{doctor.phone_number}</td>
                  <td className="py-3 px-4 border-r border-gray-300">{doctor.email}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => removeDoctor(doctor.id)}
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
                  No doctors available. Please add a new doctor.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorList;