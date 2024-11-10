// src/components/AddDoctorForm.jsx
import React, { useState } from 'react';

function AddDoctorForm() {
  // State variables for form fields
  const [name, setName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [contact, setContact] = useState('');
  const [department, setDepartment] = useState('');
  const [experience, setExperience] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && specialization && contact && department && experience) {
      alert(`Doctor Added:\nName: ${name}\nSpecialization: ${specialization}\nContact: ${contact}\nDepartment: ${department}\nExperience: ${experience} years`);
      // Reset form fields after submission
      setName('');
      setSpecialization('');
      setContact('');
      setDepartment('');
      setExperience('');
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="p-6 bg-secondary min-h-screen flex items-center justify-center">
      <form className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-primary">Add Doctor</h2>

        {/* Name Input */}
        <input
          type="text"
          placeholder="Doctor's Name"
          className="w-full p-3 mb-4 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Specialization Input */}
        <input
          type="text"
          placeholder="Specialization (e.g., Cardiologist, Dermatologist)"
          className="w-full p-3 mb-4 border rounded"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
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
          placeholder="Department (e.g., Surgery, Pediatrics)"
          className="w-full p-3 mb-4 border rounded"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />

        {/* Experience Input */}
        <input
          type="number"
          placeholder="Years of Experience"
          className="w-full p-3 mb-6 border rounded"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-3 bg-primary text-white rounded hover:bg-blue-700"
          onClick={handleSubmit}
        >
          Add Doctor
        </button>
      </form>
    </div>
  );
}

export default AddDoctorForm;
