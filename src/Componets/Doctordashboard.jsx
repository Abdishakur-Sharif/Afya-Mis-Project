import React, { useState } from 'react';
import { Paper, Button } from '@mantine/core';
import { IconUsers, IconStethoscope, IconCalendarEvent, IconCash } from '@tabler/icons-react';
import Sidebar from './Sidebar';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import 'react-calendar/dist/Calendar.css';
import Modal from 'react-modal';
import TimePicker from 'react-time-picker';


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

const initialAppointments = {
  '2024-11-07': [
    { id: 1, patient: 'Varjinia Mariane', time: '10:00 AM' },
    { id: 2, patient: 'John Doe', time: '2:00 PM' },
    { id: 3, patient: 'Jane Doe', time: '3:00 PM' },
    { id: 4, patient: 'John Doe', time: '4:00 PM' },
    { id: 5, patient: 'Jane Doe', time: '5:00 PM' },
    { id: 6, patient: 'John Doe', time: '6:00 PM' },
    { id: 7, patient: 'Jane Doe', time: '7:00 PM' },
    { id: 8, patient: 'John Doe', time: '8:00 PM' },
  ],
  '2024-11-08': [
    { id: 3, patient: 'Jane Doe', time: '1:00 PM' },
    { id: 4, patient: 'John Doe', time: '2:00 PM' },
  ],
  '2024-11-09': [
    { id: 4, patient: 'John Doe', time: '2:00 PM' },
    { id: 5, patient: 'Jane Doe', time: '3:00 PM' },
  ],
};

function Doctordashboard() {
   const [patients, setPatients] = useState(initialPatients);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);  // Defaults to today’s date
  const [appointments, setAppointments] = useState(initialAppointments);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rescheduleAppointmentId, setRescheduleAppointmentId] = useState(null);
  const [newDate, setNewDate] = useState(selectedDate);
  const [newTime, setNewTime] = useState('10:00');

  const selectedAppointments = appointments[selectedDate] || [];

   const handleDateChange = (event) => {
    setSelectedDate(event.target.value);  // Update selected date
  };

  const openRescheduleModal = (appointmentId) => {
    setRescheduleAppointmentId(appointmentId);
    setIsModalOpen(true);
  };

  const closeRescheduleModal = () => {
    setIsModalOpen(false);
  };

  const saveRescheduledAppointment = () => {
    setAppointments((prev) => {
      const updatedAppointments = { ...prev };
      updatedAppointments[selectedDate] = updatedAppointments[selectedDate].map((app) =>
        app.id === rescheduleAppointmentId ? { ...app, time: newTime } : app
      );
      return updatedAppointments;
    });
    setIsModalOpen(false);
  };

  const cancelAppointment = (appointmentId) => {
    setAppointments((prev) => {
      const updatedAppointments = { ...prev };
      updatedAppointments[selectedDate] = updatedAppointments[selectedDate].filter((app) => app.id !== appointmentId);
      return updatedAppointments;
    });
  };


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
    // add a welcome message for the doctor and the calender with time
    <div>
      <div className="flex flex-row">
        <Sidebar />
        <div className="flex flex-col">
          <div className="p-6 h-10 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-left w-full mb-32">
            {summaryCards.map((card, index) => (
              <Paper key={index} className={`${card.bgColor} text-white p-6 rounded-lg shadow-lg relative`}>
                <h3 className="text-xl">{card.label}</h3>
                <p className="text-4xl font-semibold">{card.value}</p>
                {card.icon}
              </Paper>
            ))}
          </div>
          <div className="flex space-x-4">
            {/* New Patient List */}
            <div className="w-[600px] p-6 bg-gray-50 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">New Patient List</h2>
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
                            ${
                              patient.status === 'Received'
                                ? 'bg-green-500 hover:bg-green-600'
                                : 'bg-red-500 hover:bg-red-600'
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

          {/* Date Selector and Appointment List */}
          <div className="p-6 bg-white rounded-lg shadow-lg w-full">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Select Date for Appointments</h2>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="border border-gray-300 p-2 rounded mb-4 w-full max-w-xs"
            />

            {selectedAppointments.length > 0 ? (
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-200 text-gray-600">
                    <th className="p-3">Patient Name</th>
                    <th className="p-3">Time</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedAppointments.map((appointment) => (
                    <tr key={appointment.id} className="border-b border-gray-300 hover:bg-gray-100">
                      <td className="p-3">{appointment.patient}</td>
                      <td className="p-3">{appointment.time}</td>
                      <td className="p-3 flex space-x-2">
                        <Button size="xs" variant="outline" onClick={() => openRescheduleModal(appointment.id)} 
                        className='bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full font-medium transition-all'
                        >
                          Reschedule
                        </Button>
                        <Button size="xs" color="red" variant="outline" onClick={() => cancelAppointment(appointment.id)}
                          className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full font-medium transition-all'

                          >
                          Cancel
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No appointments for this day.</p>
            )}
          </div>
          </div>
        </div>
      </div>
       {/* Reschedule Modal */}
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeRescheduleModal}
            contentLabel="Reschedule Appointment"
            className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto"
            style={{
              overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
              content: { inset: '20%', maxWidth: '400px', margin: 'auto' },
            }}
          >
            <h2 className="text-xl font-semibold mb-4">Reschedule Appointment</h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">New Date:</label>
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full p-2 mt-1 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">New Time:</label>
              <TimePicker onChange={setNewTime} value={newTime} className="w-full mt-1 " />
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button size="xs" variant="outline" onClick={saveRescheduledAppointment}>
                Save
              </Button>
              <Button size="xs" color="red" variant="outline" onClick={closeRescheduleModal}>
                Cancel
              </Button>
            </div>
          </Modal>

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
  );
}

export default Doctordashboard;
