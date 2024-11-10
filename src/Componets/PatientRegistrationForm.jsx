import React, { useState } from 'react';

function PatientRegistrationForm({ onSubmit }) {
  const [patientName, setPatientName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!patientName || !contactInfo || !email || !address || !dateOfBirth || !gender) {
      setErrorMessage('Please fill in all fields to register patient.');

      // Clear error message after 3 seconds
      setTimeout(() => {
        setErrorMessage('');
      }, 3000); // 3000ms = 3 seconds

      return;
    }

    // Clear any existing error message if validation passes
    setErrorMessage('');

    // Proceed with the form submission
    onSubmit({ patientName, contactInfo, email, address, dateOfBirth, age, gender });
    setPatientName('');
    setContactInfo('');
    setEmail('');
    setAddress('');
    setDateOfBirth('');
    setAge('');
    setGender('');
    setIsRegistered(true); // Show registration confirmation message
  };

  const handleDateOfBirthChange = (e) => {
    const date = e.target.value;
    setDateOfBirth(date);

    if (date) {
      const birthDate = new Date(date);
      const currentDate = new Date();
      let calculatedAge = currentDate.getFullYear() - birthDate.getFullYear();
      const monthDifference = currentDate.getMonth() - birthDate.getMonth();
      const dayDifference = currentDate.getDate() - birthDate.getDate();

      // Adjust age if the birth date hasn't occurred yet this year
      if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
        calculatedAge--;
      }

      setAge(calculatedAge);
    } else {
      setAge('');
    }
  };

  // Reset confirmation when starting a new registration
  const resetConfirmation = () => {
    if (isRegistered) setIsRegistered(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="p-6 bg-white shadow-lg rounded-lg space-y-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Register Patient</h2>
        
        <input
          type="text"
          placeholder="Patient Name"
          value={patientName}
          onChange={(e) => { setPatientName(e.target.value); resetConfirmation(); }}
          className="border p-4 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        
        <input
          type="text"
          placeholder="Contact Info"
          value={contactInfo}
          onChange={(e) => { setContactInfo(e.target.value); resetConfirmation(); }}
          className="border p-4 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); resetConfirmation(); }}
          className="border p-4 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => { setAddress(e.target.value); resetConfirmation(); }}
          className="border p-4 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        
        <input
          type="date"
          placeholder="Date of Birth"
          value={dateOfBirth}
          onChange={(e) => { handleDateOfBirthChange(e); resetConfirmation(); }}
          className="border p-4 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        
        <input
          type="number"
          placeholder="Age"
          value={age}
          disabled
          className="border p-4 w-full rounded-lg bg-gray-200"
        />
        
        <select
          value={gender}
          onChange={(e) => { setGender(e.target.value); resetConfirmation(); }}
          className="border p-4 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <button 
          type="submit" 
          className="bg-blue-500 text-white p-4 w-full rounded-lg hover:bg-blue-600 transition duration-300">
          Register
        </button>
      </form>

      {/* Display the registration confirmation message */}
      {isRegistered && (
        <div className="mt-4 p-4 text-green-700 bg-green-100 rounded-lg text-center">
          Patient has been successfully registered!
        </div>
      )}

      {/* Display the error message if validation fails */}
      {errorMessage && (
        <div className="mt-4 p-4 text-red-700 bg-red-100 rounded-lg text-center">
          {errorMessage}
        </div>
      )}
    </div>
  );
}

export default PatientRegistrationForm;
