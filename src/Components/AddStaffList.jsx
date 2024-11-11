import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AddStaffList = () => {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);  // To handle loading state
  const [error, setError] = useState(null);  // To handle potential errors
  const [newStaff, setNewStaff] = useState({
    name: '',
    department: '',
    contact: '',
    email: '',
  });

  // Fetch staff data from API or mock data
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        // Replace with your actual API endpoint if available
        const response = await new Promise((resolve) =>
          setTimeout(() =>
            resolve({
              ok: true,
              json: () =>
                Promise.resolve([
                  { id: 1, name: 'John Doe', department: 'Administration', contact: '123-456-7890', email: 'john.doe@example.com' },
                  { id: 2, name: 'Jane Smith', department: 'Nursing', contact: '987-654-3210', email: 'jane.smith@example.com' },
                ]),
            }), 1000)
        );
        if (!response.ok) {
          throw new Error('Failed to fetch staff data');
        }
        const data = await response.json();  // Assuming the data is returned in JSON format
        setStaffList(data);
      } catch (err) {
        console.error('Error fetching staff data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  // Handle input changes for new staff form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStaff((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission for adding new staff
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const staffToAdd = {
      id: staffList.length + 1,  // Generate a new ID (replace with backend-generated ID in real apps)
      ...newStaff,
    };

    // Add the new staff to the list
    setStaffList((prevState) => [...prevState, staffToAdd]);

    // Optionally, send the new staff to your API here
    // Example API call (replace with your actual endpoint):
    // fetch('YOUR_API_ENDPOINT', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(staffToAdd),
    // });

    // Reset the form
    setNewStaff({
      name: '',
      department: '',
      contact: '',
      email: '',
    });
  };

  // Render loading state, error state, or staff list
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">Staff List</h2>

      {/* Add New Staff Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-2xl font-semibold mb-4">Add New Staff</h3>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-semibold text-blue-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={newStaff.name}
            onChange={handleInputChange}
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
            value={newStaff.department}
            onChange={handleInputChange}
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
            value={newStaff.contact}
            onChange={handleInputChange}
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
            value={newStaff.email}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 mt-2"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Staff
        </button>
      </form>

      {/* Staff List Table */}
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
            {staffList.length > 0 ? (
              staffList.map((staff) => (
                <tr key={staff.id} className="border-b hover:bg-blue-100">
                  <td className="py-2 px-4 text-blue-700">{staff.name}</td>
                  <td className="py-2 px-4">{staff.department}</td>
                  <td className="py-2 px-4">{staff.contact}</td>
                  <td className="py-2 px-4">{staff.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-4 text-center text-blue-700">
                  No staff available. Please add a new staff.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddStaffList;
