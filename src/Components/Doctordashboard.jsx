import React, { useState } from 'react';
import { Paper, Button } from '@mantine/core';
import { IconUsers, IconStethoscope, IconCalendarEvent, IconCash } from '@tabler/icons-react';
import Sidebar from './Sidebar';
import 'react-calendar/dist/Calendar.css';
import Appointments from './Appointments';



const initialPatients = [
  { id: 1, name: 'Varjinia Mariane', address: '4472 Fridcost Road', disease: 'Fever', status: 'Received' },
  { id: 2, name: 'Julei Maryam', address: '5272 Fire Accose Road', disease: 'Cancer', status: 'Received' },
  { id: 3, name: 'Jacqueline Lori', address: '4652 School Road', disease: 'Dental', status: 'Cancel' },
  { id: 4, name: 'Jonathan South', address: '4586 University Road', disease: 'Heart', status: 'Received' },
  { id: 5, name: 'Margaret Smith', address: '4578 Village View Drive', disease: 'Neuro', status: 'Cancel' },
];

function Doctordashboard() {
   const [patients, setPatients] = useState(initialPatients);
  const toggleStatus = (id) => {
    setPatients((prevPatients) =>
      prevPatients.map((patient) =>
        patient.id === id
          ? {
              ...patient,
              status: patient.status === 'Received' ? 'Canceled' : 'Received',
            }
          : patient
      )
    );
  };

  const summaryCards = [
    {
      label: 'New Patients',
      value: 27,
      bgColor: 'bg-gradient-to-r from-blue-500 to-blue-400',
      icon: <IconUsers size={80} className="absolute opacity-10 right-4 top-4" />,
    },
    {
      label: 'Our Doctors',
      value: 12,
      bgColor: 'bg-gradient-to-r from-green-500 to-green-400',
      icon: <IconStethoscope size={80} className="absolute opacity-10 right-4 top-4" />,
    },
    {
      label: "Lab Requests",
      value: 5,
      bgColor: 'bg-gradient-to-r from-yellow-500 to-yellow-400',
      icon: <IconCalendarEvent size={80} className="absolute opacity-10 right-4 top-4" />,
    },
    {
      label: "Today's Appointments",
      value: '36',
      bgColor: 'bg-gradient-to-r from-gray-500 to-gray-400',
      icon: <IconCash size={80} className="absolute opacity-10 right-4 top-4" />,
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar />
      <div className="flex flex-col w-full p-4 lg:w-4/5">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {summaryCards.map((card, index) => (
            <Paper key={index} className={`${card.bgColor} text-white p-6 rounded-lg shadow-lg relative`}>
              <h3 className="text-xl">{card.label}</h3>
              <p className="text-4xl font-semibold">{card.value}</p>
              {card.icon}
            </Paper>
          ))}
        </div>

        {/* New Patient List */}
        <div className="w-full p-6 bg-gray-50 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">New Patient List</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-3 text-gray-600">Name</th>
                  <th className="p-3 text-gray-600">Address</th>
                  <th className="p-3 text-gray-600">Diseases</th>
                  <th className="p-3 text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient.id} className="border-b border-gray-300 hover:bg-gray-100">
                    <td className="p-3">{patient.name}</td>
                    <td className="p-3">{patient.address}</td>
                    <td className="p-3">{patient.disease}</td>
                    <td className="p-3">
                      <button
                        onClick={() => toggleStatus(patient.id)}
                        className={`px-3 py-1 rounded-full text-white font-medium transition-all
                          ${patient.status === 'Received' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}
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


