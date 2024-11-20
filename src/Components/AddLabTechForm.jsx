import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios for making API requests

const AddLabTechForm = () => {
  const [labtechname, setLabTechName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const [successMessage, setSuccessMessage] = useState(""); // State for success messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create new labtech object
    const newLabTech = {
      name: labtechname,
      email,
      phone_number: contact, // Match the backend field names
    };

    try {
      // Send POST request to the backend
      const response = await axios.post("http://127.0.0.1:5555/lab_techs", newLabTech);

      // Reset form fields
      setLabTechName("");
      setContact("");
      setEmail("");

      // Set success message
      setSuccessMessage("Lab Technician added successfully!");

      // Navigate back to the labtechs list after a short delay
      setTimeout(() => {
        navigate("/labtechs");
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      // Handle error response
      if (error.response) {
        setErrorMessage(error.response.data.message); // Set error message from backend
      } else {
        setErrorMessage("An error occurred while adding the lab technician.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Add New LabTech
        </h2>
        
        {/* Display error message if exists */}
        {errorMessage && (
          <div className="mb-4 text-red-600 text-center">
            {errorMessage}
          </div>
        )}

        {/* Display success message if exists */}
        {successMessage && (
          <div className="mb-4 text-green-600 text-center">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-blue-600 mb-2">LabTech Name</label>
            <input
              type="text"
              value={labtechname}
              onChange={(e) => setLabTechName(e.target.value)}
              required
              className="w-full p-2 border rounded-lg bg-blue-50 text-blue-700 border-blue-300 focus:border-blue-600 focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mb-4">
            <label className="block text-blue-600 mb-2">Contact Number</label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
              className="w-full p-2 border rounded-lg bg-blue-50 text-blue-700 border-blue-300 focus:border-blue-600 focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mb-6">
            <label className="block text-blue-600 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border rounded-lg bg-blue-50 text-blue-700 border-blue-300 focus:border-blue-600 focus:ring focus:ring-blue-200"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add LabTech
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLabTechForm;