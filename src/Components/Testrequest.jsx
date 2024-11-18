import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Checkbox,
} from "@mui/material";

import { Search as SearchIcon, Add as AddIcon } from "@mui/icons-material";

// Fetch endpoint
const API_URL = "http://127.0.0.1:5555/tests";

function TestRequestsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [newRequest, setNewRequest] = useState({
    patientName: "",
    dob: "",
    doctor: "",
    testType: "",
    ciDate: "",
    status: "Pending",
    dueDate: "",
  });
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

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewRequest({ ...newRequest, [name]: value });
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


  const handleCheckboxChange = async (testId, status) => {
    try {
      const response = await fetch(`${API_URL}/${testId}`, {
        // Use testId here
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }), // Send the updated status to the backend
      });

      if (!response.ok) {
        const errorText = await response.text(); // Get the response text for more details
        throw new Error(`Failed to update status: ${errorText}`);
      }

      const updatedTest = await response.json();

      // Update the test list in the state to reflect the new status
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
        <AppBar position="static" className="bg-blue-600 mb-5">
          <Toolbar className="flex justify-between">
            <Typography variant="h6" className="text-white">
              Test Requests
            </Typography>
            <div className="flex items-center bg-white p-2 rounded-lg shadow-md">
              <SearchIcon className="text-gray-400" />
              <InputBase
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
                className="ml-2 w-full"
              />
            </div>
          </Toolbar>
        </AppBar>


        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <TableContainer component={Paper} className="rounded-lg shadow">
            <Table>
              <TableHead className="bg-blue-200">
                <TableRow>
                  <TableCell>Patient Name</TableCell>
                  <TableCell>Doctor</TableCell>
                  <TableCell>Lab Tech</TableCell>
                  <TableCell>Test Type</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>{request.patient?.name}</TableCell>
                    <TableCell>{request.doctor?.name}</TableCell>
                    <TableCell>{request.lab_tech?.name}</TableCell>
                    <TableCell>{request.test_types?.test_name}</TableCell>
                    <TableCell>{request.status}</TableCell>
                    <TableCell>
                      <Checkbox
                        checked={request.status === "Completed"} // Check if status is "Completed"
                        onChange={() =>
                          handleCheckboxChange(
                            request.id,
                            request.status === "pending"
                              ? "completed"
                              : "pending"
                          )
                        }
                        sx={{
                          color:
                            request.status === "Completed"
                              ? "#388e3c"
                              : "#d32f2f", // Green for completed, Red for pending
                          "&.Mui-checked": {
                            color:
                              request.status === "Completed"
                                ? "#388e3c"
                                : "#d32f2f", // Green when checked for completed, Red for pending
                          },
                        }}
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleViewReport(request.id)}
                      >
                        Add Report
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </main>
    </div>
  );
}

export default TestRequestsPage;
