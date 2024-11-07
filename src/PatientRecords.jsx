import React, { useState } from 'react';

function PatientRecords({ patients }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedPatient, setEditedPatient] = useState({});

  // Filter patients based on the search term
  const filteredPatients = patients.filter(patient =>
    patient.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle edit button click
  const handleEditClick = (index, patient) => {
    setEditingIndex(index);
    setEditedPatient(patient);
  };

  // Handle input change during edit
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPatient({
      ...editedPatient,
      [name]: value,
    });
  };

  // Handle save button click
  const handleSaveClick = () => {
    // 
    patients[editingIndex] = editedPatient;
    setEditingIndex(null);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Patient Records</h2>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          className="px-4 py-2 w-full border border-gray-300 rounded-md"
          placeholder="Search patients..."
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
              <th className="px-4 py-2 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                {editingIndex === index ? (
                  <>
                    <td className="px-4 py-3 border-b border-gray-200 text-gray-700 text-sm">
                      <input
                        type="text"
                        name="patientName"
                        value={editedPatient.patientName}
                        onChange={handleInputChange}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md"
                      />
                    </td>
                    <td className="px-4 py-3 border-b border-gray-200 text-gray-700 text-sm">
                      <input
                        type="number"
                        name="age"
                        value={editedPatient.age}
                        onChange={handleInputChange}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md"
                      />
                    </td>
                    <td className="px-4 py-3 border-b border-gray-200 text-gray-700 text-sm">
                      <input
                        type="text"
                        name="gender"
                        value={editedPatient.gender}
                        onChange={handleInputChange}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md"
                      />
                    </td>
                    <td className="px-4 py-3 border-b border-gray-200 text-gray-700 text-sm">
                      <input
                        type="email"
                        name="email"
                        value={editedPatient.email}
                        onChange={handleInputChange}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md"
                      />
                    </td>
                    <td className="px-4 py-3 border-b border-gray-200 text-gray-700 text-sm">
                      <input
                        type="text"
                        name="address"
                        value={editedPatient.address}
                        onChange={handleInputChange}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md"
                      />
                    </td>
                    <td className="px-4 py-3 border-b border-gray-200 text-gray-700 text-sm">
                      <input
                        type="text"
                        name="contactInfo"
                        value={editedPatient.contactInfo}
                        onChange={handleInputChange}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md"
                      />
                    </td>
                    <td className="px-4 py-3 border-b border-gray-200 text-gray-700 text-sm">
                      <button
                        onClick={handleSaveClick}
                        className="px-4 py-2 bg-green-500 text-white rounded-md mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingIndex(null)}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
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
                    <td className="px-4 py-3 border-b border-gray-200 text-gray-700 text-sm">
                      <button
                        onClick={() => handleEditClick(index, patient)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                      >
                        Edit
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PatientRecords;
