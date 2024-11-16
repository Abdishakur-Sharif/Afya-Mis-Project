import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddLabTechForm = () => {
  const [labtechname, setLabTechName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create new labtech object
    const newLabTech = {
      id: Date.now(),
      name: labtechname,
      contact,
      email,
    };

    // Retrieve existing labtechs from local storage or set to empty array if none
    const storedLabTechs = JSON.parse(localStorage.getItem("labtechs")) || [];

    // Add the new labtech to the list
    const updatedLabTechs = [...storedLabTechs, newLabTech];

    // Save the updated list back to local storage
    localStorage.setItem("labtechs", JSON.stringify(updatedLabTechs));

    // Reset form fields
    setLabTechName("");
    setContact("");
    setEmail("");

    // Navigate back to the labtechs list
    navigate("/labtechs");
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Add New LabTech
        </h2>
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
