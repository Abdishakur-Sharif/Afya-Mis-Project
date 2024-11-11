import React, { useState } from 'react';
import { Paper, Button } from '@mantine/core';
import { IconUsers, IconStethoscope, IconCalendarEvent, IconCash } from '@tabler/icons-react';
import Sidebar from './Sidebar';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import 'react-calendar/dist/Calendar.css';
import Appointments from './Appointments';

// Example data for new and old patients
const data = [
  { date: 'January', newPatients: 12, oldPatients: 8 },
  { date: 'February', newPatients: 14, oldPatients: 9 },
  { date: 'March', newPatients: 16, oldPatients: 12 },
  { date: 'April', newPatients: 10, oldPatients: 7 },
  { date: 'May', newPatients: 13, oldPatients: 10 },
  { date: 'June', newPatients: 18, oldPatients: 14 },
  { date: 'July', newPatients: 20, oldPatients: 16 },
  { date: 'August', newPatients: 17, oldPatients: 12 },
  { date: 'September', newPatients: 14, oldPatients: 9 },
  { date: 'October', newPatients: 15, oldPatients: 11 },
  { date: 'November', newPatients: 19, oldPatients: 15 },
  { date: 'December', newPatients: 22, oldPatients: 18 },
];

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
      label: "Today's Operation",
      value: 5,
      bgColor: 'bg-gradient-to-r from-yellow-500 to-yellow-400',
      icon: <IconCalendarEvent size={80} className="absolute opacity-10 right-4 top-4" />,
    },
    {
      label: 'Total Appointments',
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

        {/* Area Chart */}
        <div className="p-6 w-full" style={{ height: '500px' }}>
          <h2 className="text-2xl mb-4">Patient Data Over the Year</h2>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="newPatients" stroke="#8884d8" fill="#8884d8" />
              <Area type="monotone" dataKey="oldPatients" stroke="#82ca9d" fill="#82ca9d" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Doctordashboard;


