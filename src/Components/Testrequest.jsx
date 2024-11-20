import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Fetch endpoint
const API_URL = "http://127.0.0.1:5555/tests";

function TestRequestsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [testRequests, setTestRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch tests on mount
  useEffect(() => {
    const fetchTests = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch test requests.");
        const data = await response.json();
        setTestRequests(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleViewReport = (testId) => {
    const selectedTest = testRequests.find((request) => request.id === testId);
    navigate("/labreportform", {
      state: {
        patientName: selectedTest.patient?.name,
        doctorName: selectedTest.doctor?.name,
        testType: selectedTest.test_types?.test_name,
        labTech: selectedTest.lab_tech?.name,
      },
    });
  };

  const handleCheckboxChange = async (testId, currentStatus) => {
    const newStatus = currentStatus === "pending" ? "completed" : "pending";

    try {
      const response = await fetch(`${API_URL}/${testId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update status: ${errorText}`);
      }

      const updatedTest = await response.json();
      setTestRequests((prevRequests) =>
        prevRequests.map((test) =>
          test.id === testId ? { ...test, status: updatedTest.status } : test
        )
      );
    } catch (error) {
      console.error(error);
      alert("Failed to update status");
    }
  };

  const filteredRequests = testRequests.filter((request) => {
    return (
      (request.patient.name &&
        request.patient.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase())) ||
      (request.doctor.name &&
        String(request.doctor.name)
          .toLowerCase()
          .includes(searchQuery.toLowerCase())) ||
      (request.test_types?.test_name &&
        String(request.test_types.test_name)
          .toLowerCase()
          .includes(searchQuery.toLowerCase())) ||
      (request.status &&
        String(request.status)
          .toLowerCase()
          .includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="bg-blue-500 text-white p-5 md:w-1/4 w-full min-h-screen">
        <h2 className="text-3xl font-bold mb-8">Afya</h2>
        <ul className="space-y-4">
          <li>
            <a
              href="/lab-dashboard"
              className="block py-2 px-4 rounded-md hover:bg-blue-700 transition"
            >
              Lab Requests
            </a>
          </li>
          <li>
            <a
              href="/doctors"
              className="block py-2 px-4 rounded-md hover:bg-blue-700 transition"
            >
              Doctors
            </a>
          </li>
          <li>
            <a
              href="/labreportform"
              className="block py-2 px-4 rounded-md hover:bg-blue-700 transition"
            >
              Lab Reports
            </a>
          </li>
          <li>
            <a
              href="/login"
              className="block py-2 px-4 rounded-md bg-red-500 hover:bg-red-700 transition"
            >
              Logout
            </a>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-5">
        <div className="flex justify-between mb-5">
          <h1 className="text-xl font-bold">Test Requests</h1>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            className="border p-1 rounded-md w-1/3 text-sm"
          />
        </div>

        {loading ? (
          <div className="text-center text-sm">Loading...</div>
        ) : error ? (
          <div className="text-red-500 text-center text-sm">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-sm">
              <thead className="bg-blue-200">
                <tr>
                  <th className="px-2 py-1">Patient Name</th>
                  <th className="px-2 py-1">Doctor</th>
                  <th className="px-2 py-1">Lab Tech</th>
                  <th className="px-2 py-1">Test Type</th>
                  <th className="px-2 py-1">Status</th>
                  <th className="px-2 py-1">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((request) => (
                  <tr key={request.id}>
                    <td className="border px-2 py-1">
                      {request.patient?.name}
                    </td>
                    <td className="border px-2 py-1">{request.doctor?.name}</td>
                    <td className="border px-2 py-1">
                      {request.lab_tech?.name}
                    </td>
                    <td className="border px-2 py-1">
                      {request.test_types?.test_name}
                    </td>
                    <td className="border px-2 py-1">
                      <span
                        className={`inline-block p-1 rounded-md text-white ${
                          request.status === "completed"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {request.status === "completed"
                          ? "Completed"
                          : "Pending"}
                      </span>
                    </td>
                    <td className="border px-2 py-1">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={request.status === "completed"}
                          onChange={() =>
                            handleCheckboxChange(request.id, request.status)
                          }
                          className="form-checkbox h-4 w-4 text-green-500 checked:bg-green-500"
                        />
                      </label>
                      <button
                        onClick={() => handleViewReport(request.id)}
                        className="ml-2 bg-blue-500 text-white py-1 px-2 rounded-md text-xs"
                      >
                        Add Report
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

export default TestRequestsPage;
