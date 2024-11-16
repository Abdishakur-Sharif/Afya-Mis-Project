import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LabTechList = () => {
  const [labtechList, setLabTechList] = useState([]);

  useEffect(() => {
    const storedLabTechs = localStorage.getItem("labtechs"); // Correct the key name here
    if (storedLabTechs) {
      setLabTechList(JSON.parse(storedLabTechs));
    }
  }, []);

  // Remove labtech function
  const removeLabtech = (id) => {
    const updatedLabTechs = labtechList.filter((labtech) => labtech.id !== id);
    setLabTechList(updatedLabTechs);
    localStorage.setItem("labtechs", JSON.stringify(updatedLabTechs)); // Ensure the key is the same here
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">LabTech List</h2>

      {/* Button to Navigate to Add labtech Form */}
      <Link
        to="/addlabtechs"
        className="mb-6 inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Add New LabTech
      </Link>

      {/* Labtech List Table */}
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white rounded-lg shadow-md border border-gray-200">
          <thead>
            <tr className="bg-blue-600 text-white text-left">
              <th className="py-3 px-4 border-r border-gray-300 font-semibold">
                Name
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
            {labtechList.length > 0 ? (
              labtechList.map((labtech) => (
                <tr
                  key={labtech.id}
                  className="border-b last:border-none hover:bg-blue-100"
                >
                  <td className="py-3 px-4 border-r border-gray-300 text-blue-700">
                    {labtech.name}
                  </td>
                  <td className="py-3 px-4 border-r border-gray-300">
                    {labtech.contact}
                  </td>
                  <td className="py-3 px-4 border-r border-gray-300">
                    {labtech.email}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => removeLabtech(labtech.id)}
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
                  No LabTechns available. Please add a new LabTech.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LabTechList;
