import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddNurseForm = () => {
  // State variables for form fields
  const [nurseName, setNurseName] = useState('');
  const [department, setDepartment] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate(); // To redirect after successful submission

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh

    // Prepare the nurse data to be sent to the API
    const newNurse = { name: nurseName, department, contact, email };

    try {
      // Make the POST request to the API
      const response = await fetch('YOUR_API_ENDPOINT_HERE', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNurse),
      });

      // Check if the response is okay (status code 200-299)
      if (!response.ok) {
        throw new Error('Failed to add nurse');
      }

      console.log('Nurse added successfully'); // Success message in the console

      // Redirect to the nurse list page after successful addition
      navigate('/nurses');
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding nurse');
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">Add New Nurse</h2>
      
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
        {/* Nurse Name */}
        <div className="mb-4">
          <label htmlFor="nurseName" className="block text-gray-700 font-semibold mb-2">Nurse Name</label>
          <input
            type="text"
            id="nurseName"
            value={nurseName}
            onChange={(e) => setNurseName(e.target.value)}
            required
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Department */}
        <div className="mb-4">
          <label htmlFor="department" className="block text-gray-700 font-semibold mb-2">Department</label>
          <input
            type="text"
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Contact */}
        <div className="mb-4">
          <label htmlFor="contact" className="block text-gray-700 font-semibold mb-2">Contact</label>
          <input
            type="text"
            id="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Nurse
        </button>
      </form>
    </div>
  );
};

export default AddNurseForm;
