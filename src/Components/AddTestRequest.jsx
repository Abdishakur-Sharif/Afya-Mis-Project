import React, { useState } from "react";

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
      const response = await fetch("http://127.0.0.1:5555/tests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

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
        <div>
          <label
            className="block text-gray-700 font-medium"
            htmlFor="patientName"
          >
            Patient Name
          </label>
          <input
            type="text"
            id="patientName"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label
            className="block text-gray-700 font-medium"
            htmlFor="doctorName"
          >
            Doctor Name
          </label>
          <input
            type="text"
            id="doctorName"
            name="doctorName"
            value={formData.doctorName}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label
            className="block text-gray-700 font-medium"
            htmlFor="labTechName"
          >
            Lab Tech Name
          </label>
          <input
            type="text"
            id="labTechName"
            name="labTechName"
            value={formData.labTechName}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label
            className="block text-gray-700 font-medium"
            htmlFor="testTypeName"
          >
            Test Type Name
          </label>
          <input
            type="text"
            id="testTypeName"
            name="testTypeName"
            value={formData.testTypeName}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            required
          />
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
