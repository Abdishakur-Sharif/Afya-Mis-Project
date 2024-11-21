import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Payment() {
  const { patientId } = useParams(); // Extract only patientId
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [service, setService] = useState("");
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // New state for success message

  useEffect(() => {
    fetchPatientDetails();
  }, [patientId]);

  const fetchPatientDetails = async () => {
    try {
      const response = await fetch(
        `https://afya-mis-backend-6.onrender.com/patients/${patientId}`
      );
      const data = await response.json();
      if (response.ok) {
        setPatient(data);
      } else {
        console.error("Error fetching patient details:", data.message);
      }
    } catch (error) {
      console.error("Error fetching patient details:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const paymentData = {
      patient_id: patientId, // Send patient_id along with service and amount
      service: service,
      amount: amount,
    };

    try {
      setIsSubmitting(true); // Set submitting to true while the payment is being processed
      const response = await fetch("https://afya-mis-backend-6.onrender.com/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error("Payment creation failed");
      }

      const data = await response.json();
      console.log("Payment created successfully:", data);

      // Display success message and reset the form
      setSuccessMessage("Payment was successful!");
      setService("");
      setAmount("");

      // Redirect to the receptionist dashboard after a successful payment
      setTimeout(() => {
        navigate("/receptionist-dashboard"); // Assuming the receptionist dashboard URL is '/dashboard'
      }, 2000); // Wait for 2 seconds before redirecting for a better user experience
    } catch (error) {
      console.error("Payment error:", error.message);
    } finally {
      setIsSubmitting(false); // Reset submitting state after the process
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Add Payment</h2>

      {successMessage && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 border border-green-300 rounded-md">
          {successMessage}
        </div>
      )}

      {patient ? (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700">
            Patient Details:
          </h3>
          <p className="text-sm text-gray-600">Name: {patient.name}</p>
          <p className="text-sm text-gray-600">Email: {patient.email}</p>
          <p className="text-sm text-gray-600">Phone: {patient.phone_number}</p>
        </div>
      ) : (
        <p>Loading patient details...</p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Service
          </label>
          <input
            type="text"
            className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={service}
            onChange={(e) => setService(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            type="number"
            className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Payment"}
        </button>
      </form>
    </div>
  );
}

export default Payment;
