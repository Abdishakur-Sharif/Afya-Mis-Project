import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import Axios for making API requests

const LabTechList = () => {
  const [labtechList, setLabTechList] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state

  useEffect(() => {
    const fetchLabTechs = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5555/lab_techs");
        setLabTechList(response.data); // Assuming the API returns an array of lab techs
      } catch (err) {
        setError("Failed to fetch lab technicians.");
      } finally {
        setLoading(false);
      }
    };

    fetchLabTechs();
  }, []);

  // Remove labtech function
  const removeLabtech = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this LabTech?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://127.0.0.1:5555/lab_techs/${id}`); // Call the API to delete
      setLabTechList(labtechList.filter((labtech) => labtech.id !== id)); // Update local state
    } catch (err) {
      setError("Failed to delete lab technician.");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">LabTech List</h2>

      {/* Button to Navigate to Admin Dashboard */}
      <Link
        to="/admindashboard"
        className="mb-6 inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Admin Dashboard
      </Link>
      <br />
      {/* Button to Navigate to Add labtech Form */}
      <Link
        to="/addlabtechs"
        className="mb-6 inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Add New LabTech
      </Link>

      {/* Display loading state */}
      {loading ? (
        <div className="text-center text-blue-700">Loading LabTechns...</div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : (
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full bg-white rounded-lg shadow-md border border-gray-200">
            <thead>
              <tr className="bg-blue-600 text-white text-left">
                <th className="py-3 px-4 border-r border-gray-300 font-semibold">Name</th>
                <th className="py-3 px-4 border-r border-gray-300 font-semibold">Contact</th>
                <th className="py-3 px-4 border-r border-gray-300 font-semibold">Email</th>
                {/* <th className="py-3 px-4 font-semibold">Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {labtechList.length > 0 ? (
                labtechList.map((labtech) => (
                  <tr key={labtech.id} className="border-b last:border-none hover:bg-blue-100">
                    <td className="py-3 px-4 border-r border-gray-300 text-blue-700">{labtech.name}</td>
                    <td className="py-3 px-4 border-r border-gray-300">{labtech.phone_number}</td>
                    <td className="py-3 px-4 border-r border-gray-300">{labtech.email}</td>
                    {/* <td className="py-3 px-4">
                      <button
                        onClick={() => removeLabtech(labtech.id)}
                        className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition-colors"
                      >
                        Remove
                      </button>
                    </td> */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-4 text-center text-blue-700">
                    No LabTechns available. Please add a new LabTech.
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

export default LabTechList;