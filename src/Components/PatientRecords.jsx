import React, { useState, useEffect } from 'react';

function PatientRecords() {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch patients from API when component mounts
  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5555/patients'); // Adjust the URL to your API
      const data = await response.json();
      if (response.ok) {
        setPatients(data);
      } else {
        console.error('Error fetching patients:', data.message);
      }
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  // Function to calculate age from date of birth
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();

    // If the birthday hasn't occurred yet this year, subtract 1 from the age
    if (month < birthDate.getMonth() || (month === birthDate.getMonth() && day < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Filter patients based on the search term
  const filteredPatients = (patients || []).filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Patient Records</h2>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search patients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="px-4 py-2 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">Age</th>
              <th className="px-4 py-2 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">Gender</th>
              <th className="px-4 py-2 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="px-4 py-2 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">Address</th>
              <th className="px-4 py-2 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="px-4 py-3 border-b border-gray-200 text-sm">{patient.name}</td>
                <td className="px-4 py-3 border-b border-gray-200 text-sm">
                  {patient.date_of_birth ? calculateAge(patient.date_of_birth) : 'N/A'}
                </td>
                <td className="px-4 py-3 border-b border-gray-200 text-sm">{patient.gender}</td>
                <td className="px-4 py-3 border-b border-gray-200 text-sm">{patient.email}</td>
                <td className="px-4 py-3 border-b border-gray-200 text-sm">{patient.address}</td>
                <td className="px-4 py-3 border-b border-gray-200 text-sm">{patient.phone_number || 'No contact info'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PatientRecords;
