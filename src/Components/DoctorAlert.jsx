import React, { useEffect, useState } from "react";
import socket from "./context/Socket.jsx";


const DoctorAlert = () => {
  const [alerts, setAlerts] = useState([]);
  const [completedTests, setCompletedTests] = useState([]);

useEffect(() => {
  socket.on("lab_report_completed", (data) => {
    console.log("Received lab report notification:", data); // Debugging
    setAlerts((prevAlerts) => [...prevAlerts, data.message]);
    setCompletedTests((prevTests) => [...prevTests, data.testDetails]);
  });

  return () => {
    socket.off("lab_report_completed");
  };
}, []);


  return (
    <div className="min-h-screen bg-blue-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-blue-800 mb-6">
          Doctor's Dashboard
        </h1>

        <h2 className="text-xl font-semibold text-blue-700 mb-3">
          Alerts ({alerts.length})
        </h2>
        {alerts.length === 0 ? (
          <p className="text-gray-500 italic">No alerts</p>
        ) : (
          <ul className="space-y-2 mb-6">
            {alerts.map((alert, index) => (
              <li
                key={index}
                className="p-3 bg-blue-50 rounded-lg border border-blue-200 text-blue-700"
              >
                {alert}
              </li>
            ))}
          </ul>
        )}

        <h2 className="text-xl font-semibold text-blue-700 mb-3">
          Completed Tests ({completedTests.length})
        </h2>
        {completedTests.length === 0 ? (
          <p className="text-gray-500 italic">No completed tests yet</p>
        ) : (
          <ul className="space-y-2">
            {completedTests.map((test, index) => (
              <li
                key={index}
                className="p-3 bg-green-50 rounded-lg border border-green-200 text-green-700"
              >
                <p>
                  <strong>Test Type:</strong> {test.testTypeName}
                </p>
                <p>
                  <strong>Patient:</strong> {test.patientName}
                </p>
                <p>
                  <strong>Lab Technician:</strong> {test.labTechName}
                </p>
                <p>
                  <strong>Completed At:</strong> {test.completedAt}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DoctorAlert;
