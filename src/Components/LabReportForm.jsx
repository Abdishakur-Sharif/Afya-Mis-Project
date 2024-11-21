import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { IconHospitalCircle } from "@tabler/icons-react";


const Notification = ({ message, type }) => {
  if (!message) return null;

  const bgColor =
    type === "success"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";

  return (
    <div className={`p-4 mb-6 rounded-md text-center ${bgColor}`}>
      {message}
    </div>
  );
};

const LabReportForm = () => {
  const location = useLocation();
  const { patientName, doctorName, testType, labTech, testId } =
    location.state || {};
  const [remarks, setRemarks] = useState("");
  const [findings, setFindings] = useState([{ parameter: "", result: "" }]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    visible: false,
    type: "",
    message: "",
  });

  const handleAddFinding = () => {
    setFindings([...findings, { parameter: "", result: "" }]);
  };

  const handleRemoveFinding = (index) => {
    setFindings(findings.filter((_, i) => i !== index));
  };

  const handleFindingChange = (index, name, value) => {
    const newFindings = [...findings];
    newFindings[index][name] = value;
    setFindings(newFindings);
  };

  const resetForm = () => {
    setRemarks("");
    setFindings([{ parameter: "", result: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate findings
    for (const finding of findings) {
      if (!finding.parameter || !finding.result) {
        setNotification({
          visible: true,
          type: "error",
          message: "Please fill in both parameter and result for each finding.",
        });
        setLoading(false);
        return;
      }
    }

    const reportData = {
      patient_name: patientName,
      doctor_name: doctorName,
      test_type: testType,
      findings: findings,
      remark: remarks,
      labTech, // Include lab tech details
    };

    try {
      const response = await fetch("http://127.0.0.1:5555/test_reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reportData),
      });

      const result = await response.json();

      if (result.error) {
        setNotification({
          visible: true,
          type: "error",
          message: `Error: ${result.error}`,
        });
      } else {
        setNotification({
          visible: true,
          type: "success",
          message: `The lab result for ${patientName} is ready!`,
        });

      }
    } catch (error) {
      setNotification({
        visible: true,
        type: "error",
        message: `Error: ${error.message}`,
      });
    } finally {
      resetForm();
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-3/4 mx-auto bg-white shadow-md rounded-lg p-4 md:p-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-700 mb-4 md:mb-6">
          Lab Report Form
        </h2>
        <a
          href="/lab-dashboard"
          className="mb-5 flex items-center p-2 text-gray-700 hover:bg-blue-500 hover:text-white transition-colors rounded-md"
        >
          <IconHospitalCircle size={20} className="mr-3" />
          Lab Requests
        </a>

        <Notification message={notification.message} type={notification.type} />

        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Test Details:
          </h3>

          <div>
            <p className="text-gray-600 font-medium">
              Patient Name: <span className="font-semibold">{patientName}</span>
            </p>
          </div>

          <div>
            <p className="text-gray-600 font-medium">
              Doctor Name: <span className="font-semibold">{doctorName}</span>
            </p>
          </div>

          <div>
            <p className="text-gray-600 font-medium">
              Test Type: <span className="font-semibold">{testType}</span>
            </p>
          </div>

          <div>
            <p className="text-gray-600 font-medium">
              Lab Tech: <span className="font-semibold">{labTech}</span>
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Test Findings
            </h3>
            {findings.map((finding, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2 mb-2"
              >
                <input
                  type="text"
                  name="parameter"
                  placeholder="Parameter"
                  value={finding.parameter}
                  onChange={(e) =>
                    handleFindingChange(index, "parameter", e.target.value)
                  }
                  required
                  className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  name="result"
                  placeholder="Result"
                  value={finding.result}
                  onChange={(e) =>
                    handleFindingChange(index, "result", e.target.value)
                  }
                  required
                  className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md"
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
            <label className="block text-gray-600 font-medium mb-2">
              Remarks
            </label>
            <textarea
              placeholder="Enter Remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
          </div>

          <div className="text-right">
            <button
              type="submit"
              disabled={loading}
              className={`w-full md:w-auto px-4 py-2 font-medium rounded-md text-white ${
                loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Submitting..." : "Submit Report"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LabReportForm;
