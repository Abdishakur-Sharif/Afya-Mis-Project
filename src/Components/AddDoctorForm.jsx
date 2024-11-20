import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddDoctorForm = () => {
  const [doctorName, setDoctorName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create new doctor object
    const newDoctor = {
      name: doctorName,
      email,
      phone_number: contact, // Updated to match backend
      speciality: specialization, // Updated to match backend
    };

    console.log('Sending doctor data:', newDoctor); // Log the data being sent

    try {
      // Send POST request to the backend using Axios
      const response = await axios.post('http://127.0.0.1:5555/doctors', newDoctor);

      if (response.status !== 201) {
        throw new Error('Failed to add doctor');
      }

      // Set success message
      setSuccessMessage('Doctor added successfully!');

      // Reset form fields
      setDoctorName('');
      setSpecialization('');
      setContact('');
      setEmail('');

      // Optionally navigate back to the doctors list after a delay
      setTimeout(() => {
        navigate('/doctors');
      }, 2000); // Navigate after 2 seconds

    } catch (error) {
      console.error('Error adding doctor:', error.response ? error.response.data : error.message);
      // Optionally: Show an error message to the user
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">Add New Doctor</h2>

        {/* Display success message */}
        {successMessage && (
          <div className="mb-4 text-green-600 text-center">
            {successMessage}
          </div>
        )}

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
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Add Doctor
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDoctorForm;