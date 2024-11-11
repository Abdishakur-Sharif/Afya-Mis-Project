import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AddNurseList = () => {
  const [nurses, setNurses] = useState([]);
  const [newNurse, setNewNurse] = useState({
    name: '',
    department: '',
    contact: '',
    email: '',
  });
  const [loading, setLoading] = useState(true);  // For loading state
  const [error, setError] = useState(null);  // For error handling

  // Fetch existing nurses (replace with API call if needed)
  useEffect(() => {
    const fetchNurses = async () => {
      try {
        // Sample data (replace with API call if needed)
        const sampleData = [
          { id: 1, name: 'Nurse Mary Johnson', department: 'Pediatrics', contact: '123-456-7890', email: 'maryj@example.com' },
          { id: 2, name: 'Nurse Kevin Lee', department: 'Emergency', contact: '987-654-3210', email: 'kevinl@example.com' },
        ];
        setNurses(sampleData);
        setLoading(false);
      } catch (err) {
        setError('Error fetching nurses');
        setLoading(false);
      }
    };
    fetchNurses();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewNurse((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission to add new nurse
  const handleSubmit = (e) => {
    e.preventDefault();
    const nurseToAdd = {
      id: nurses.length + 1,  // Generate a new ID (replace with backend-generated ID in real apps)
      ...newNurse,
    };

    // Update the nurse list by adding the new nurse
    setNurses((prevState) => [...prevState, nurseToAdd]);

    // Optionally, you could send the new nurse to an API here using fetch or axios
    // Example API call (replace with actual endpoint):
    // fetch('YOUR_API_ENDPOINT', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(nurseToAdd),
    // });

    // Reset form fields
    setNewNurse({ name: '', department: '', contact: '', email: '' });
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
      <h2 className="text-3xl font-bold text-blue-600 mb-6">Nurses List</h2>

      {/* Add Nurse Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-2xl font-semibold mb-4">Add New Nurse</h3>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-semibold text-blue-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={newNurse.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 mt-2"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="department" className="block text-sm font-semibold text-blue-700">Department</label>
          <input
            type="text"
            id="department"
            name="department"
            value={newNurse.department}
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
            value={newNurse.contact}
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
            value={newNurse.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 mt-2"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Nurse
        </button>
      </form>

      {/* Nurses List Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Department</th>
              <th className="py-2 px-4">Contact</th>
              <th className="py-2 px-4">Email</th>
            </tr>
          </thead>
          <tbody>
            {nurses.length > 0 ? (
              nurses.map((nurse) => (
                <tr key={nurse.id} className="border-b hover:bg-blue-100">
                  <td className="py-2 px-4 text-blue-700">{nurse.name}</td>
                  <td className="py-2 px-4">{nurse.department}</td>
                  <td className="py-2 px-4">{nurse.contact}</td>
                  <td className="py-2 px-4">{nurse.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-2 px-4 text-center text-gray-500">No nurses available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddNurseList;
