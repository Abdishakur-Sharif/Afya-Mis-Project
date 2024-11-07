// src/components/PatientRecords.js
import React, { useState } from 'react';

function PatientRecords({ patients }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter patients based on the search term
  const filteredPatients = patients.filter(patient =>
    patient.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Patient Records</h2>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          className="px-4 py-2 w-full border border-gray-300 rounded-md"
          placeholder=""
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">
                Name
              </th>
              <th className="px-4 py-2 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">
                Age
              </th>
              <th className="px-4 py-2 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">
                Gender
              </th>
              <th className="px-4 py-2 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">
                Email
              </th>
              <th className="px-4 py-2 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">
                Address
              </th>
              <th className="px-4 py-2 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">
                Contact Info
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="px-4 py-3 border-b border-gray-200 text-gray-700 text-sm">
                  {patient.patientName}
                </td>
                <td className="px-4 py-3 border-b border-gray-200 text-gray-700 text-sm">
                  {patient.age}
                </td>
                <td className="px-4 py-3 border-b border-gray-200 text-gray-700 text-sm">
                  {patient.gender}
                </td>
                <td className="px-4 py-3 border-b border-gray-200 text-gray-700 text-sm">
                  {patient.email}
                </td>
                <td className="px-4 py-3 border-b border-gray-200 text-gray-700 text-sm">
                  {patient.address}
                </td>
                <td className="px-4 py-3 border-b border-gray-200 text-gray-700 text-sm">
                  {patient.contactInfo}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PatientRecords;
