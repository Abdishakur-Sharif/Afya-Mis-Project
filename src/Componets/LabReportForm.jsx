import React, { useState } from 'react';
import { Paper } from '@mantine/core';
 import {
  IconStethoscope,
  IconFileText,
  IconLogout,
  IconHospitalCircle
} from '@tabler/icons-react';

// Notification component to show messages to the doctor
const Notification = ({ message, type }) => {
  if (!message) return null;

  const bgColor = type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700';
  
  return (
    <div className={`p-4 mb-6 rounded-md text-center ${bgColor}`}>
      {message}
    </div>
  );
};

const LabReportForm = () => {
  const [patientName, setPatientName] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [testType, setTestType] = useState('');
  const [remarks, setRemarks] = useState('');
  const [findings, setFindings] = useState([{ parameter: '', result: '' }]); // Default to one finding
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ visible: false, type: '', message: '' });

  // Add a new finding row
  const handleAddFinding = () => {
    setFindings([...findings, { parameter: '', result: '' }]);
  };

  // Remove a finding row
  const handleRemoveFinding = (index) => {
    setFindings(findings.filter((_, i) => i !== index));
  };

  // Handle changes in the findings input
  const handleFindingChange = (index, name, value) => {
    const newFindings = [...findings];
    newFindings[index][name] = value;
    setFindings(newFindings);
  };

  // Handle form reset
  const resetForm = () => {
    setPatientName('');
    setDoctorName('');
    setTestType('');
    setRemarks('');
    setFindings([{ parameter: '', result: '' }]); // Reset findings to one default row
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const reportData = {
      patientName,
      doctorName,
      testType,
      remarks,
      findings,
    };

    console.log('Submitting form with data:', reportData); // Log the form data for now

    // Simulate form submission (could be an API call here)
    setTimeout(() => {
      // Notification to notify the doctor that the result is ready
      setNotification({
        visible: true,
        type: 'success',
        message: `The lab result for ${patientName} is ready! You can now check the result.`,
      });
      
      resetForm(); // Reset the form fields after submission
      setLoading(false);
    }, 1000);
  };

  return (
    <div className='flex flex-row'>
        <Paper shadow="sm" className="w-52 h-[500px]  ">
      <h2 className="text-2xl mb-5 mr-28">Afya</h2>
      <ul className="space-y-4">
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
            Lab Reports
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
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 mt-8">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Lab Report Form</h2>

      {/* Show notification when the form is submitted */}
      <Notification message={notification.message} type={notification.type} />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-600 font-medium mb-2">Patient Name</label>
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
            placeholder="Enter Patient Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-2">Doctor Name</label>
          <input
            type="text"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            required
            placeholder="Enter Doctor Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-2">Test Type</label>
          <select
            value={testType}
            onChange={(e) => setTestType(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="" disabled>
              Select Test Type
            </option>
            <option value="blood">Blood Test</option>
            <option value="urine">Urine Test</option>
            <option value="xray">X-ray</option>
          </select>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Test Findings</h3>
          {findings.map((finding, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                name="parameter"
                placeholder="Parameter"
                value={finding.parameter}
                onChange={(e) => handleFindingChange(index, 'parameter', e.target.value)}
                required
                className="w-1/2 px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="result"
                placeholder="Result"
                value={finding.result}
                onChange={(e) => handleFindingChange(index, 'result', e.target.value)}
                required
                className="w-1/2 px-3 py-2 border border-gray-300 rounded-md"
              />
              <button
                type="button"
                onClick={() => handleRemoveFinding(index)}
                className="px-3 py-2 text-sm font-semibold text-red-500 bg-red-100 rounded-md"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddFinding}
            className="mt-2 text-blue-500 font-medium"
          >
            + Add Finding
          </button>
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-2">Remarks</label>
          <textarea
            placeholder="Enter Remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="text-right">
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 font-medium rounded-md text-white ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {loading ? 'Submitting...' : 'Submit Report'}
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default LabReportForm;
