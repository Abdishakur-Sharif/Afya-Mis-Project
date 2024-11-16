// AddDoctorForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddDoctorForm = () => {
  const [doctorName, setDoctorName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create new doctor object
    const newDoctor = {
      id: Date.now(),  // Unique ID for each doctor
      name: doctorName,
      specialization,
      contact,
      email,
    };

    // Retrieve existing doctors from local storage or set to empty array if none
    const storedDoctors = JSON.parse(localStorage.getItem('doctors')) || [];
    // Add the new doctor to the list
    const updatedDoctors = [...storedDoctors, newDoctor];
    // Save the updated list back to local storage
    localStorage.setItem('doctors', JSON.stringify(updatedDoctors));

    // Reset form fields
    setDoctorName('');
    setSpecialization('');
    setContact('');
    setEmail('');

    // Navigate back to the doctors list
    navigate('/doctors');
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">Add New Doctor</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-blue-600 mb-2">Doctor Name</label>
            <input
              type="text"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              required
              className="w-full p-2 border rounded-lg bg-blue-50 text-blue-700 border-blue-300 focus:border-blue-600 focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mb-4">
            <label className="block text-blue-600 mb-2">Specialization</label>
            <input
              type="text"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
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
            Add Doctor
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDoctorForm;
