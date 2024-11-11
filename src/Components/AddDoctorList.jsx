import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AddDoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    specialization: '',
    contact: '',
    email: '',
  });
  const [loading, setLoading] = useState(true);  // To handle loading state
  const [error, setError] = useState(null);  // To handle potential errors

  // Fetch doctors list from API or mock data
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        // Sample data (replace with API call if needed)
        const sampleData = [
          { id: 1, name: 'Dr. John Doe', specialization: 'Cardiology', contact: '123-456-7890', email: 'johndoe@example.com' },
          { id: 2, name: 'Dr. Jane Smith', specialization: 'Dermatology', contact: '987-654-3210', email: 'janesmith@example.com' },
        ];
        setDoctors(sampleData);
        setLoading(false);
      } catch (err) {
        setError('Error fetching doctors');
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission to add new doctor
  const handleSubmit = (e) => {
    e.preventDefault();
    const doctorToAdd = {
      id: doctors.length + 1,  // Generate a new ID (replace with backend-generated ID in real apps)
      ...newDoctor,
    };

    // Update the doctor list by adding the new doctor
    setDoctors((prevState) => [...prevState, doctorToAdd]);

    // Optionally, send the new doctor to an API here using fetch or axios
    // Example API call (replace with actual endpoint):
    // fetch('YOUR_API_ENDPOINT', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(doctorToAdd),
    // });

    // Reset form fields
    setNewDoctor({ name: '', specialization: '', contact: '', email: '' });
  };

  // Loading or error state
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">Doctors List</h2>

      {/* Add Doctor Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-2xl font-semibold mb-4">Add New Doctor</h3>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-semibold text-blue-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={newDoctor.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 mt-2"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="specialization" className="block text-sm font-semibold text-blue-700">Specialization</label>
          <input
            type="text"
            id="specialization"
            name="specialization"
            value={newDoctor.specialization}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 mt-2"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="contact" className="block text-sm font-semibold text-blue-700">Contact</label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={newDoctor.contact}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 mt-2"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold text-blue-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={newDoctor.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 mt-2"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Doctor
        </button>
      </form>

      {/* Doctors List Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Specialization</th>
              <th className="py-2 px-4">Contact</th>
              <th className="py-2 px-4">Email</th>
            </tr>
          </thead>
          <tbody>
            {doctors.length > 0 ? (
              doctors.map((doctor) => (
                <tr key={doctor.id} className="border-b hover:bg-blue-100">
                  <td className="py-2 px-4 text-blue-700">{doctor.name}</td>
                  <td className="py-2 px-4">{doctor.specialization}</td>
                  <td className="py-2 px-4">{doctor.contact}</td>
                  <td className="py-2 px-4">{doctor.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-4 text-center text-blue-700">
                  No doctors found. Please add a new doctor.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddDoctorList;
