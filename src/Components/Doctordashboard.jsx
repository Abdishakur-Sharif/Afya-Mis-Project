import React, { useState, useEffect } from "react";
import { Paper } from "@mantine/core";
import {
  IconUsers,
  IconStethoscope,
  IconCalendarEvent,
  IconCash,
} from "@tabler/icons-react";
import Sidebar from "./Sidebar";
import Appointments from "./Appointments";
import "react-calendar/dist/Calendar.css";

function Doctordashboard() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [labRequests, setLabRequests] = useState([]);
  const [appointments, setAppointments] = useState([]);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch patients and filter by ID > 20
        const patientsRes = await fetch("http://127.0.0.1:5555/patients");
        const patientsData = await patientsRes.json();
        const filteredPatients = patientsData.filter(
          (patient) => patient.id > 20
        );
        setPatients(filteredPatients);

        // Fetch doctors
        const doctorsRes = await fetch("http://127.0.0.1:5555/doctors");
        const doctorsData = await doctorsRes.json();
        setDoctors(doctorsData);

        // Fetch lab requests
        const testsRes = await fetch("http://127.0.0.1:5555/tests");
        const testsData = await testsRes.json();
        setLabRequests(testsData);

        // Fetch appointments
        const appointmentsRes = await fetch(
          "http://127.0.0.1:5555/appointments"
        );
        const appointmentsData = await appointmentsRes.json();
        setAppointments(appointmentsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Toggle patient status
  const toggleStatus = (id) => {
    setPatients((prevPatients) =>
      prevPatients.map((patient) =>
        patient.id === id
          ? {
              ...patient,
              status: patient.status === "Received" ? "Canceled" : "Received",
            }
          : patient
      )
    );
  };

  // Summary Cards Data
  const summaryCards = [
    {
      label: "New Patients",
      value: patients.length,
      bgColor: "bg-gradient-to-r from-blue-500 to-blue-400",
      icon: (
        <IconUsers size={80} className="absolute opacity-10 right-4 top-4" />
      ),
    },
    {
      label: "Our Doctors",
      value: doctors.length,
      bgColor: "bg-gradient-to-r from-green-500 to-green-400",
      icon: (
        <IconStethoscope
          size={80}
          className="absolute opacity-10 right-4 top-4"
        />
      ),
    },
    {
      label: "Lab Requests",
      value: labRequests.length,
      bgColor: "bg-gradient-to-r from-yellow-500 to-yellow-400",
      icon: (
        <IconCalendarEvent
          size={80}
          className="absolute opacity-10 right-4 top-4"
        />
      ),
    },
    {
      label: "Total Appointments",
      value: appointments.length,
      bgColor: "bg-gradient-to-r from-gray-500 to-gray-400",
      icon: (
        <IconCash size={80} className="absolute opacity-10 right-4 top-4" />
      ),
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar />
      <div className="flex flex-col w-full p-4 lg:w-4/5">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {summaryCards.map((card, index) => (
            <Paper
              key={index}
              className={`${card.bgColor} text-white p-6 rounded-lg shadow-lg relative`}
            >
              <h3 className="text-xl">{card.label}</h3>
              <p className="text-4xl font-semibold">{card.value}</p>
              {card.icon}
            </Paper>
          ))}
        </div>

        {/* New Patient List */}
        <div className="w-full p-6 bg-gray-50 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            New Patient List
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-3 text-gray-600">Name</th>
                  <th className="p-3 text-gray-600">Phone Number</th>
                  <th className="p-3 text-gray-600">Email</th>
                  <th className="p-3 text-gray-600">Gender</th>
                  <th className="p-3 text-gray-600">Medical History</th>
                  <th className="p-3 text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr
                    key={patient.id}
                    className="border-b border-gray-300 hover:bg-gray-100"
                  >
                    <td className="p-3">{patient.name}</td>
                    <td className="p-3">{patient.phone_number}</td>
                    <td className="p-3">{patient.email}</td>
                    <td className="p-3">{patient.gender}</td>
                    <td className="p-3">{patient.medical_history}</td>
                    <td className="p-3">
                      <button
                        onClick={() => toggleStatus(patient.id)}
                        className={`px-3 py-1 rounded-full text-white font-medium transition-all ${
                          patient.status === "Received"
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-red-500 hover:bg-red-600"
                        }`}
                      >
                        {patient.status}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Appointments Section */}
        <Appointments />
      </div>
    </div>
  );
}

export default Doctordashboard;
