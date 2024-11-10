// src/components/AddStaffForm.jsx
import React, { useState } from 'react';

function AddStaffForm() {
  // State variables for form fields
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [contact, setContact] = useState('');
  const [department, setDepartment] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && role && contact && department) {
      alert(`Staff Added:\nName: ${name}\nRole: ${role}\nContact: ${contact}\nDepartment: ${department}`);
      // Reset form fields after submission
      setName('');
      setRole('');
      setContact('');
      setDepartment('');
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="p-6 bg-secondary min-h-screen flex items-center justify-center">
      <form className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-primary">Add Staff Member</h2>

        {/* Name Input */}
        <input
          type="text"
          placeholder="Staff Name"
          className="w-full p-3 mb-4 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Role Input */}
        <input
          type="text"
          placeholder="Role (e.g., Receptionist, Janitor)"
          className="w-full p-3 mb-4 border rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        {/* Contact Input */}
        <input
          type="text"
          placeholder="Contact Number"
          className="w-full p-3 mb-4 border rounded"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />

        {/* Department Input */}
        <input
          type="text"
          placeholder="Department (e.g., Administration, Maintenance)"
          className="w-full p-3 mb-6 border rounded"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-3 bg-primary text-white rounded hover:bg-blue-700"
          onClick={handleSubmit}
        >
          Add Staff
        </button>
      </form>
    </div>
  );
}

export default AddStaffForm;
