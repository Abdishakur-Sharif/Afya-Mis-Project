import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddStaffForm = () => {
  const [staffName, setStaffName] = useState('');
  const [department, setDepartment] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  
  const navigate = useNavigate(); // For navigation after success

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from reloading the page

    const newStaff = { name: staffName, department, contact, email };

    try {
      const response = await fetch('YOUR_API_ENDPOINT_HERE', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStaff),
      });

      if (!response.ok) throw new Error('Failed to add staff');

      console.log('Staff added successfully');
      navigate('/staffs'); // Redirect to staff list after success
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding staff');
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">Add New Staff</h2>
      
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="staffName" className="block text-gray-700 font-semibold mb-2">Staff Name</label>
          <input
            type="text"
            id="staffName"
            value={staffName}
            onChange={(e) => setStaffName(e.target.value)}
            required
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

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

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Staff
        </button>
      </form>
    </div>
  );
};

export default AddStaffForm;
