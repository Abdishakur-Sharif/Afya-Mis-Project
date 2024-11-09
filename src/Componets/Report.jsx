import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";

function Report() {
  const formRef = useRef(null);
  const signatureRef = useRef(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [texts, setTexts] = useState({
    text1: "",
    text2: "",
    text3: "",
    text4: "",
    text5: "",
    text6: "",
    text7: "",
    text8: "",
    text9: "",
  });
  const [patientDetails, setPatientDetails] = useState({
    patientName: "",
    age: "",
    gender: "",
    DOB: "",
    recordNumber: "",
  });

  const [doctorDetails, setDoctorDetails] = useState({
    doctorName: '',
    department: '',
    licenceNumber: '', 
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (Object.keys(patientDetails).includes(name)) {
      setPatientDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));

    } 
    if (Object.keys(doctorDetails).includes(name)){
      setDoctorDetails((prevDetails)=>({
        ...prevDetails,
        [name]: value,
      }));
    }
    else {
      setTexts((prevTexts) => ({
        ...prevTexts,
        [name]: value, // Update only the specific textarea
      }));
    }
  };
  const clearSignature = () => {
    signatureRef.current.clear();
  };
  const saveSignature = () => {
    if (signatureRef.current.isEmpty()) {
      alert("The signature is empty. Please sign before saving.");
      return;
    }
    const dataUrl = signatureRef.current.getTrimmedCanvas().toDataURL();
    console.log("Captured signature", dataUrl);
    alert("Signature captured successfully");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formRef.current.checkValidity()) {
      console.log("Form submitted");
      console.log("Date:", date, "Time:", time);
      console.log("patientDetails:", patientDetails);
      console.log("texts:", texts);
      alert("Form submitted successfully");

      // Reset form fields
      formRef.current.reset();

      // Clear state
      setDate("");
      setTime("");

      setTexts({
        text1: "",
        text2: "",
        text3: "",
        text4: "",
        text5: "",
        text6: "",
        text7: "",
        text8: "",
        text9: "",
      });
      setPatientDetails({
        patientName: "",
        age: "",
        gender: "",
        DOB: "",
        recordNumber: "",
      });
      setDoctorDetails({
        doctorName: '',
        department: '',
        licenceNumber: '',
      });

      // Clear signature
      clearSignature();
    } else {
      console.log("Please fill required fields");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 ">MEDICAL REPORT</h1>
      <div className="mb-4 flex justify-between">
        <form ref={formRef} className="space-y-4">
          <label className="mr-2 w-32 text-right">Date:</label>
          <input
            className="flex-1 flex-grow:1 border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <label className="mr-2 w-32 text-right">Time:</label>
          <input
            className="flex-1 flex-grow:1 border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </form >
      </div>
      <div className="flex-1  flex-grow:1 border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 mb-4">
        <form  ref={formRef} className="space-y-4">
          <h3>Patient's details</h3>
          <ul className="space-y-4">
            <li className="flex items-center">
              <label className="mr-2 w-32 text-right">Full Names:</label>
              <input
                className="flex-1 flex-grow:1 border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
                type="text"
                name="patientName"
                placeholder="full names"
                value={patientDetails.patientName}
                onChange={handleChange}
              />
            </li>
            <li className="flex items-center">
              <label className="mr-2 w-32 text-right">Age:</label>
              <input
                className="flex-1 flex-grow:1 border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
                type="number"
                name="age"
                placeholder="age"
                value={patientDetails.age}
                onChange={handleChange}
              />
            </li>
            <li className="flex items-center">
              <label className="mr-2 w-32 text-right">Gender:</label>
              <select
                className="flex-1  flex-grow:1 border border-gray-300 px-2 py-1 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
                type="text"
                name="gender"
                placeholder="gender"
                value={patientDetails.gender}
                onChange={handleChange}
              >
                <option value="">select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </li>
            <li className="flex items-center">
              <label className="mr-2 w-32 text-right">Date of Birth:</label>
              <input
                className="flex-1 flex-grow:1 border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
                type="date"
                name="DOB"
                placeholder="date of birth"
                value={patientDetails.DOB}
                onChange={handleChange}
              />
            </li>
            <li className="flex items-center">
              <label className="mr-2 w-32 text-right">Record Number:</label>
              <input
                className="flex-1 flex-grow:1 border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
                type="number"
                name="recordNumber"
                placeholder="record number"
                value={patientDetails.recordNumber}
                onChange={handleChange}
              />
            </li>
          </ul>
        </form>
      </div>

      <div className="flex-1  flex-grow:1border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 mb-4">
        <h3>Doctor's details</h3>
        <form ref={formRef} className="space-y-4">
          <ul className="space-y-4">
            <li className="flex items-center">
              <label className="mr-2 w-32 text-right">Full Names:</label>
              <input
                className="flex-1 flex-grow:1 border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
                type="text"
                name="name"
                placeholder="full names"
                value={doctorDetails.name}
                onChange={handleChange}
              />
            </li>
            <li className="flex items-center">
              <label className="mr-2 w-32 text-right">Department:</label>
              <select
                name="department"
                class="flex-1 border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
                value={doctorDetails.department}
                onChange={handleChange}
              >
                <option value="" disabled selected>
                  Select a Department
                </option>
                // Clinical Departments
                <optgroup label="Clinical Departments">
                  <option value="general-medicine">
                    General Medicine (Internal Medicine)
                  </option>
                  <option value="pediatrics">Pediatrics</option>
                  <option value="cardiology">Cardiology</option>
                  <option value="neurology">Neurology</option>
                  <option value="dermatology">Dermatology</option>
                  <option value="endocrinology">Endocrinology</option>
                  <option value="gastroenterology">Gastroenterology</option>
                  <option value="hematology">Hematology</option>
                  <option value="infectious-diseases">
                    Infectious Diseases
                  </option>
                  <option value="nephrology">Nephrology</option>
                  <option value="oncology">Oncology</option>
                  <option value="pulmonology">Pulmonology</option>
                  <option value="rheumatology">Rheumatology</option>
                </optgroup>
                // Surgical Departments
                <optgroup label="Surgical Departments">
                  <option value="general-surgery">General Surgery</option>
                  <option value="orthopedics">Orthopedics</option>
                  <option value="neurosurgery">Neurosurgery</option>
                  <option value="cardiothoracic-surgery">
                    Cardiothoracic Surgery
                  </option>
                  <option value="plastic-surgery">Plastic Surgery</option>
                  <option value="ophthalmology">Ophthalmology</option>
                  <option value="otolaryngology">Otolaryngology (ENT)</option>
                  <option value="urology">Urology</option>
                </optgroup>
                //Women’s Health and Reproductive Departments
                <optgroup label="Women’s Health and Reproductive Departments">
                  <option value="gynecology">Gynecology</option>
                  <option value="obstetrics">Obstetrics</option>
                  <option value="reproductive-endocrinology">
                    Reproductive Endocrinology
                  </option>
                </optgroup>
                // Specialized Departments
                <optgroup label="Specialized Departments">
                  <option value="psychiatry">Psychiatry</option>
                  <option value="radiology">Radiology</option>
                  <option value="pathology">Pathology</option>
                  <option value="anesthesiology">Anesthesiology</option>
                  <option value="emergency-medicine">Emergency Medicine</option>
                  <option value="palliative-care">Palliative Care</option>
                </optgroup>
                // Sub-Specialized Departments
                <optgroup label="Sub-Specialized Departments">
                  <option value="geriatrics">Geriatrics</option>
                  <option value="neonatology">Neonatology</option>
                  <option value="sports-medicine">Sports Medicine</option>
                  <option value="pain-management">Pain Management</option>
                  <option value="immunology">Immunology</option>
                </optgroup>
              </select>
            </li>
            <li className="flex items-center">
              <label className="mr-2 w-32 text-right">Licence number:</label>
              <input
                className="flex-1 flex-grow:1border border-gray-300 px-2 py-1 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
                type="number"
                name="licenceNumber"
                placeholder="licence number"
                value={doctorDetails.licenceNumber}
                onChange={handleChange}
              />
            </li>
          </ul>
        </form>
      </div>
      <div className="flex-1 flex-grow:1 border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-48 mb-4">
        <h3>Reason for report</h3>
        <textarea
          name="text1"
          value={texts.text1}
          placeholder="enter text"
          onChange={handleChange}
          required="text"
          className="w-full h-[calc(100%-2rem)] p-2 flex-grow:1"
        />
      </div>
      <div className="flex-1  flex-grow:1 border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-48 mb-4">
        <h3>Medical history</h3>
        <textarea
          name="text2"
          value={texts.text2}
          placeholder="enter text"
          onChange={handleChange}
          required="text"
          className="w-full h-[calc(100%-2rem)] p-2 flex-grow:1"
        />
      </div>
      <div className="flex-1  flex-grow:1 border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-48 mb-4">
        <h3>Clinical findings </h3>
        <textarea
          name="text3"
          value={texts.text3}
          placeholder="enter text"
          onChange={handleChange}
          required="text"
          className="w-full h-[calc(100%-2rem)] p-2 flex-grow:1"
        />
      </div>
      <div className="flex-1 flex-grow:1 border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-48 mb-4">
        <h3>lab results </h3>
        <textarea
          name="text4"
          value={texts.text4}
          placeholder="enter text"
          onChange={handleChange}
          required="text"
          className="w-full h-[calc(100%-2rem)] p-2 flex-grow:1"
        />
      </div>
      <div className="flex-1 border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-48 mb-4">
        <h3 className="mb-2">Diagnosis</h3>
        <textarea
          name="text5"
          value={texts.text5}
          placeholder="enter text"
          onChange={handleChange}
          required="text"
          className="w-full h-[calc(100%-2rem)] p-2 flex-grow:1"
        />
      </div>
      <div className="flex-1  flex-grow:1 border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-48 mb-4">
        <h3 className="mb-2">Treatment plan</h3>
        <textarea
          name="text6"
          value={texts.text6}
          placeholder="enter text"
          onChange={handleChange}
          required="text"
          className="w-full h-[calc(100%-2rem)] p-2 flex-grow:1"
        />
      </div>
      <div className="flex-1 flex-grow:1 border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-48 mb-4">
        <h3 className="mb-2">Progress notes</h3>
        <textarea
          name="text7"
          value={texts.text7}
          placeholder="enter text"
          onChange={handleChange}
          required="text"
          className="w-full h-[calc(100%-2rem)] p-2 flex-grow:1"
        />
      </div>
      <div className="flex-1  flex-grow:1 border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-48 mb-4">
        <h3 className="mb-2">Prognosis</h3>
        <textarea
          name="text8"
          value={texts.text8}
          placeholder="enter text"
          onChange={handleChange}
          required="text"
          className="w-full h-[calc(100%-2rem)] p-2 flex-grow:1"
        />
      </div>
      <div className="flex-1 flex-grow:1 border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-48 mb-4">
        <h3 className="mb-2">Patients instructions</h3>
        <textarea
          name="text9"
          value={texts.text9}
          placeholder="enter text"
          onChange={handleChange}
          required="text"
          className="w-full h-[calc(100%-2rem)] p-2 flex-grow:1"
        />
      </div>
      <div className="flex-1 flex-grow:1 border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-48 mb-4">
        <h3 className="mb-2">Doctor's signature</h3>
        <SignatureCanvas
          penColor="blue"
          canvasProps={{
            width: 500,
            height: 200,
            className:
              "w-full h-[calc(100%-2rem)] p-2 flex-grow:1 border border-gray-300 rounded",
          }}
          ref={signatureRef}
        />
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
            onClick={saveSignature}
          >
            Save Signature
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600"
            onClick={clearSignature}
          >
            Clear Signature
          </button>
        </div>
      </div>
      <div className="mt-10">
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 "
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
}

export default Report;
