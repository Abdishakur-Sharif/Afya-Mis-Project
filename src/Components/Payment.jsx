import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Payment() {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [service, setService] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [phoneNumber, setPhoneNumber] = useState(""); // For MPESA
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchPatientDetails();
  }, []);

  const fetchPatientDetails = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5555/patients/${patientId}`
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate phone number for MPESA
    const isValidPhoneNumber = (number) => {
      return /^\d{12}$/.test(number) && number.startsWith("254");
    };

    if (paymentMethod === "mpesa" && !isValidPhoneNumber(phoneNumber)) {
      alert(
        "Please enter a valid phone number in international format (e.g., 2547XXXXXXXX)."
      );
      setIsSubmitting(false);
      return;
    }

    try {
      const paymentData = {
        phone_number: phoneNumber,
        amount,
        service,
      };

      const paymentResponse = await fetch(
        "http://127.0.0.1:5555/payments/mpesa",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(paymentData),
        }
      );

      const result = await paymentResponse.json();
      if (paymentResponse.ok) {
        alert("Payment added successfully!");
        setTimeout(() => navigate("/receptionist-dashboard"), 2000);
      } else {
        console.error("Payment error:", result.error);
        alert(`Error: ${result.error || "Payment failed"}`);
      }
    } catch (error) {
      console.error("Error submitting payment:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Add Payment</h2>
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
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Payment Method
          </label>
          <select
            className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="cash">Cash</option>
            <option value="mpesa">Mpesa</option>
          </select>
        </div>
        {paymentMethod === "mpesa" && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
        )}
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
