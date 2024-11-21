import React, { useState, useEffect } from 'react';

function PatientRegistrationForm() {
  const [patientName, setPatientName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [email, setEmail] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState(''); // Address field
  const [errorMessage, setErrorMessage] = useState('');

  // Function to calculate age from date of birth
  const calculateAge = (dob) => {
    if (!dob) return '';
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Update age whenever date of birth changes
  useEffect(() => {
    setAge(calculateAge(dateOfBirth));
  }, [dateOfBirth]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!patientName || !contactInfo || !email || !medicalHistory || !dateOfBirth || !gender || !address) {
      setErrorMessage('Please fill in all fields to register the patient.');
      setTimeout(() => setErrorMessage(''), 2000); // Error disappears after 2 seconds
      return;
    }

    setErrorMessage(''); // Reset error message before submission

    const patientData = {
      name: patientName,
      gender,
      phone_number: contactInfo,
      medical_history: medicalHistory,
      date_of_birth: dateOfBirth,
      email,
      address, // Include address
    };

    try {
      const response = await fetch(
        "https://afya-mis-backend-6.onrender.com/patients",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(patientData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        // Reset the form fields after successful registration
        setPatientName('');
        setContactInfo('');
        setEmail('');
        setMedicalHistory('');
        setDateOfBirth('');
        setAge('');
        setGender('');
        setAddress('');
        setErrorMessage('Patient has been successfully registered!');
        setTimeout(() => setErrorMessage(''), 2000); // Success message disappears after 2 seconds
      } else {
        setErrorMessage(result.message || 'An error occurred. Please try again.');
        setTimeout(() => setErrorMessage(''), 2000); // Error disappears after 2 seconds
      }
    } catch (error) {
      setErrorMessage('Failed to register patient. Please try again later.');
      setTimeout(() => setErrorMessage(''), 2000); // Error disappears after 2 seconds
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Register Patient</h2>

        <input
          type="text"
          placeholder="Patient Name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          className="border p-4 mb-6 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Contact Info (Phone Number)"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
          className="border p-4 mb-6 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-4 mb-6 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border p-4 mb-6 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          placeholder="Medical History"
          value={medicalHistory}
          onChange={(e) => setMedicalHistory(e.target.value)}
          className="border p-4 mb-6 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="date"
          placeholder="Date of Birth"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          className="border p-4 mb-6 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          placeholder="Age"
          value={age}
          disabled
          className="border p-4 mb-6 w-full rounded-lg bg-gray-200"
        />

        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="border p-4 mb-6 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <button
          type="submit"
          className="bg-blue-500 text-white p-4 w-full rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Register
        </button>
      </form>

      {errorMessage && (
        <div className={`mt-4 p-4 rounded-lg text-center ${errorMessage === 'Patient has been successfully registered!' ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'}`}>
          {errorMessage}
        </div>
      )}
    </div>
  );
}

export default PatientRegistrationForm;
