import React from 'react';
import { Paper } from '@mantine/core';
import {
  IconHome,
  IconCalendarEvent,
  IconUsers,
  IconStethoscope,
  IconFileText,
  IconLogout,
  IconHospitalCircle
} from '@tabler/icons-react';

function Sidebar() {
  return (
    <Paper shadow="sm" className="w-52 h-[500px]  ">
      <h2 className="text-2xl mb-5 mr-28">Afya</h2>
      <ul className="space-y-4">
        <li>
          <a
            href="/dashboard"
            className="flex items-center p-2 text-gray-700 hover:bg-blue-500 hover:text-white transition-colors rounded-md"
          >
            <IconHome size={20} className="mr-3" />
            Dashboard
          </a>
        </li>
        <li>
          <a
            href="/appointments"
            className="flex items-center p-2 text-gray-700 hover:bg-blue-500 hover:text-white transition-colors rounded-md"
          >
            <IconCalendarEvent size={20} className="mr-3" />
            Appointments
          </a>
        </li>
        <li>
          <a
            href="/patients"
            className="flex items-center p-2 text-gray-700 hover:bg-blue-500 hover:text-white transition-colors rounded-md"
          >
            <IconUsers size={20} className="mr-3" />
            Patients
          </a>
        </li>
        <li>
          <a
            href="/doctors"
            className="flex items-center p-2 text-gray-700 hover:bg-blue-500 hover:text-white transition-colors rounded-md"
          >
            <IconStethoscope size={20} className="mr-3" />
            Doctors
          </a>
        </li>
        <li>
          <a
            href="/reports"
            className="flex items-center p-2 text-gray-700 hover:bg-blue-500 hover:text-white transition-colors rounded-md"
          >
            <IconFileText size={20} className="mr-3" />
            Medical Reports
          </a>
        </li>
        <li>
          <a
            href="/settings"
            className="flex items-center p-2 text-gray-700 hover:bg-blue-500 hover:text-white transition-colors rounded-md"
          >
            <IconHospitalCircle size={20} className="mr-3" />
            Lab Requests
          </a>
        </li>
        <li>
          <a
            href="/login"
            className="flex items-center p-2 text-gray-700 hover:bg-red-500 hover:text-white transition-colors rounded-md"
          >
            <IconLogout size={20} className="mr-3" />
            Logout
          </a>
        </li>
      </ul>
    </Paper>
  );
}

export default Sidebar;
