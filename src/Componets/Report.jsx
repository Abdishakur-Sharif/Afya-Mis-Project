import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import {IconHome} from '@tabler/icons-react';


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
    doctorName: "",
    department: "",
    licenceNumber: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (Object.keys(patientDetails).includes(name)) {
      setPatientDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    } else if (Object.keys(doctorDetails).includes(name)) {
      setDoctorDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    } else {
      setTexts((prevTexts) => ({
        ...prevTexts,
        [name]: value,
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


      formRef.current.reset();
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
        doctorName: "",
        department: "",
        licenceNumber: "",
      });
      clearSignature();
    } else {
      console.log("Please fill required fields");
    }
  };


  return (
    <div className="container mx-auto p-4 space-y-6 md:space-y-10">
      <div className="flex flex-row justify-between">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-500">MEDICAL REPORT</h1>
      <a
            href="/doctordashboard"
            className="flex items-center p-2 text-gray-700 hover:bg-blue-500 hover:text-white transition-colors rounded-md"
          >
            <IconHome size={20} className="mr-3" />
            Dashboard
          </a>
      </div>
      <form ref={formRef} className="space-y-4">
        {/* Date and Time */}
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <label className="w-full md:w-1/5 text-left">Date:</label>
          <input
            className="flex-1 border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <label className="w-full md:w-1/5 text-left">Time:</label>
          <input
            className="flex-1 border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>


        {/* Patient's Details */}
        <div className="border border-gray-300 p-4 rounded-lg space-y-4">
          <h3 className="font-semibold mb-2">Patient's Details</h3>
          {[
            { name: "patientName", label: "Name", type: "text" },
            { name: "age", label: "Age", type: "number" },
            { name: "DOB", label: "Date of Birth", type: "date" },
            { name: "recordNumber", label: "Record Number", type: "text" },
          ].map((field, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4"
            >
              <label className="w-full md:w-1/5 text-left">{field.label}:</label>
              <input
                className="flex-1 border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                type={field.type}
                name={field.name}
                placeholder={field.label}
                value={patientDetails[field.name]}
                onChange={handleChange}
              />
            </div>
          ))}
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <label className="w-full md:w-1/5 text-left">Gender:</label>
            <select
              className="flex-1 border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              name="gender"
              value={patientDetails.gender}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>


        {/* Doctor's Details */}
        <div className="border border-gray-300 p-4 rounded-lg space-y-4">
          <h3 className="font-semibold mb-2">Doctor's Details</h3>
          {[
            { name: "doctorName", label: "Name", type: "text" },
            { name: "department", label: "Department", type: "text" },
            { name: "licenceNumber", label: "Licence Number", type: "text" },
          ].map((field, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4"
            >
              <label className="w-full md:w-1/5 text-left">{field.label}:</label>
              <input
                className="flex-1 border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                type={field.type}
                name={field.name}
                placeholder={field.label}
                value={doctorDetails[field.name]}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>


        {/* Report Sections */}
        {[
          "Reason for report",
          "Medical history",
          "Clinical findings",
          "Lab results",
          "Diagnosis",
          "Treatment plan",
          "Progress notes",
          "Prognosis",
          "Patient's instructions",
        ].map((title, index) => (
          <div
            key={index}
            className="border border-gray-300 p-4 rounded-lg space-y-2"
          >
            <h3 className="font-semibold mb-2">{title}</h3>
            <textarea
              name={`text${index + 1}`}
              value={texts[`text${index + 1}`]}
              placeholder="Enter text"
              onChange={handleChange}
              required
              className="w-full h-24 p-2 resize-none rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        ))}


        {/* Signature Section */}
        <div className="border border-gray-300 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Doctor's Signature</h3>
         <SignatureCanvas
          penColor="blue"
          canvasProps={{
            width: 500,
            height: 100,
            className: "border border-gray-300 rounded w-full h-full",


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


        {/* Submit Button */}
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
}


export default Report;


