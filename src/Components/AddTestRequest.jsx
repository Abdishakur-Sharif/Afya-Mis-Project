import React, { useState, useEffect } from "react";

const AddTestRequest = () => {
  const [formData, setFormData] = useState({
    created_at: "",
    status: "pending",
    patientName: "",
    doctorName: "",
    labTechName: "",
    testTypeName: "",
  });
  const [message, setMessage] = useState("");
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [labTechs, setLabTechs] = useState([]);
  const [testTypes, setTestTypes] = useState([]);

  useEffect(() => {
    // Fetch data for dropdowns
    const fetchData = async () => {
      try {
        const patientResponse = await fetch(
          "https://afya-mis-backend-6.onrender.com/patients"
        );
        const doctorResponse = await fetch(
          "https://afya-mis-backend-6.onrender.com/doctors"
        );
        const labTechResponse = await fetch(
          "https://afya-mis-backend-6.onrender.com/lab_techs"
        );
        const testTypeResponse = await fetch(
          "https://afya-mis-backend-6.onrender.com/test-types"
        );

        if (patientResponse.ok) {
          const patientData = await patientResponse.json();
          setPatients(patientData); // Assuming data is an array of patients
        }

        if (doctorResponse.ok) {
          const doctorData = await doctorResponse.json();
          setDoctors(doctorData); // Assuming data is an array of doctors
        }

        if (labTechResponse.ok) {
          const labTechData = await labTechResponse.json();
          setLabTechs(labTechData); // Assuming data is an array of lab techs
        }

        if (testTypeResponse.ok) {
          const testTypeData = await testTypeResponse.json();
          setTestTypes(testTypeData); // Assuming data is an array of test types
        }
      } catch (error) {
        setMessage(`Error fetching data: ${error.message}`);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs once after initial render

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the payload
    const payload = {
      created_at: formData.created_at,
      status: formData.status,
      patient: { name: formData.patientName },
      doctor: { name: formData.doctorName },
      lab_tech: { name: formData.labTechName },
      test_types: { test_name: formData.testTypeName },
    };

    try {
      const response = await fetch(
        "https://afya-mis-backend-6.onrender.com/tests",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMessage(`Test created successfully with ID: ${data.id}`);
        setFormData({
          created_at: "",
          status: "pending",
          patientName: "",
          doctorName: "",
          labTechName: "",
          testTypeName: "",
        });
      } else {
        const error = await response.json();
        setMessage(`Error: ${error.message}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };


  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-xl font-bold mb-4 text-gray-800">
        Create a New Test
      </h1>
      {message && (
        <div className="mb-4 p-2 rounded bg-blue-100 text-blue-700">
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            className="block text-gray-700 font-medium"
            htmlFor="created_at"
          >
            Created At (YYYY-MM-DD HH:MM:SS)
          </label>
          <input
            type="text"
            id="created_at"
            name="created_at"
            value={formData.created_at}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Patient Name Dropdown */}
        <div>
          <label
            className="block text-gray-700 font-medium"
            htmlFor="patientName"
          >
            Patient Name
          </label>
          <select
            id="patientName"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select Patient</option>
            {patients.map((patient) => (
              <option key={patient.id} value={patient.name}>
                {patient.name}
              </option>
            ))}
          </select>
        </div>

        {/* Doctor Name Dropdown */}
        <div>
          <label
            className="block text-gray-700 font-medium"
            htmlFor="doctorName"
          >
            Doctor Name
          </label>
          <select
            id="doctorName"
            name="doctorName"
            value={formData.doctorName}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select Doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.name}>
                {doctor.name}
              </option>
            ))}
          </select>
        </div>

        {/* Lab Tech Name Dropdown */}
        <div>
          <label
            className="block text-gray-700 font-medium"
            htmlFor="labTechName"
          >
            Lab Tech Name
          </label>
          <select
            id="labTechName"
            name="labTechName"
            value={formData.labTechName}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select Lab Tech</option>
            {labTechs.map((labTech) => (
              <option key={labTech.id} value={labTech.name}>
                {labTech.name}
              </option>
            ))}
          </select>
        </div>

        {/* Test Type Name Dropdown */}
        <div>
          <label
            className="block text-gray-700 font-medium"
            htmlFor="testTypeName"
          >
            Test Type Name
          </label>
          <select
            id="testTypeName"
            name="testTypeName"
            value={formData.testTypeName}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select Test Type</option>
            {testTypes.map((testType) => (
              <option key={testType.id} value={testType.test_name}>
                {testType.test_name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Create Test
        </button>
      </form>
    </div>
  );
};

export default AddTestRequest;
