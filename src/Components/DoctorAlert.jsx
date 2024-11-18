import React, { useEffect, useState } from "react";
import socket from "./context/Socket.jsx";


const DoctorAlert = () => {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        // Listen for alerts
        socket.on("lab_report_completed", (data) => {
            setAlerts((prevAlerts) => [...prevAlerts, data.message]);
        });

        // Cleanup
        return () => {
            socket.off("lab_report_completed");
        };
    }, []);

    return (
        <div className="min-h-screen bg-blue-100 p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold text-blue-800 mb-6">Doctor's Dashboard</h1>
                <h2 className="text-xl font-semibold text-blue-700 mb-3">Alerts</h2>
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
                
                <div className="mt-8">
                    <h2 className="text-xl font-semibold text-blue-700 mb-3">Completed Tests</h2>
                    <div className="min-h-48 bg-blue-50 rounded-lg border border-blue-200 p-4">
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorAlert;