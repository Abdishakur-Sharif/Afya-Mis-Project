import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation

function PatientRecords() {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // Hook to handle navigation

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const [patientsResponse, paymentsResponse] = await Promise.all([
        fetch("https://afya-mis-backend-6.onrender.com/patients"),
        fetch("https://afya-mis-backend-6.onrender.com/payments"),
      ]);

      if (patientsResponse.ok && paymentsResponse.ok) {
        const patientsData = await patientsResponse.json();
        const paymentsData = await paymentsResponse.json();

        // Update patients with the payment status
        const patientsWithPayments = patientsData.map((patient) => ({
          ...patient,
          hasPaid: paymentsData.some(
            (payment) => payment.patient_name === patient.name
          ),
        }));

        setPatients(patientsWithPayments);
      } else {
        console.error("Error fetching patients or payments.");
      }
    } catch (error) {
      console.error("Error fetching patients or payments:", error);
    }
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();

    if (
      month < birthDate.getMonth() ||
      (month === birthDate.getMonth() && day < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const filteredPatients = (patients || []).filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPayment = (patientId) => {
    navigate(`/payment/${patientId}`);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Patient Records</h2>

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
              {/* <th className="px-4 py-2 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">
                Address
              </th> */}
              <th className="px-4 py-2 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">
                Phone Number
              </th>
              <th className="px-4 py-2 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="px-4 py-3 border-b border-gray-200 text-sm">
                  {patient.name}
                </td>
                <td className="px-4 py-3 border-b border-gray-200 text-sm">
                  {patient.date_of_birth
                    ? calculateAge(patient.date_of_birth)
                    : "N/A"}
                </td>
                <td className="px-4 py-3 border-b border-gray-200 text-sm">
                  {patient.gender}
                </td>
                <td className="px-4 py-3 border-b border-gray-200 text-sm">
                  {patient.email}
                </td>
                {/* <td className="px-4 py-3 border-b border-gray-200 text-sm">
                  {patient.address}
                </td> */}
                <td className="px-4 py-3 border-b border-gray-200 text-sm">
                  {patient.phone_number || "No contact info"}
                </td>
                <td className="px-4 py-3 border-b border-gray-200 text-sm">
                  {patient.hasPaid ? (
                    <button className="px-4 py-2 bg-green-500 text-white rounded-md cursor-not-allowed">
                      Paid
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAddPayment(patient.id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                    >
                      Add Payment
                    </button>
                  )}
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
