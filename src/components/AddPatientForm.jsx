// src/components/AddPatientForm.jsx
import React, { useState } from 'react';

function AddPatientForm() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [disease, setDisease] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Patient Added: ${name}, Age: ${age}, Disease: ${disease}`);
  };

  return (
    <form className="p-6 bg-secondary text-primary" onSubmit={handleSubmit}>
      <h2 className="text-2xl mb-4">Add Patient</h2>
      <input
        type="text"
        placeholder="Name"
        className="w-full p-2 mb-4 border rounded"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Age"
        className="w-full p-2 mb-4 border rounded"
        onChange={(e) => setAge(e.target.value)}
      />
      <input
        type="text"
        placeholder="Disease"
        className="w-full p-2 mb-4 border rounded"
        onChange={(e) => setDisease(e.target.value)}
      />
      <button type="submit" className="w-full p-2 bg-primary text-white rounded">
        Submit
      </button>
    </form>
  );
}

export default AddPatientForm;
