import React from "react";

const TestAlertButton = () => {
    const sendTestAlert = async () => {
        const response = await fetch("http://localhost:5555/send_test_alert", {
            method: "POST",
        });

        if (response.ok) {
            alert("Test alert sent successfully!");
        } else {
            alert("Failed to send test alert.");
        }
    };

    return (
        <div>
            <button onClick={sendTestAlert}>Send Test Alert</button>
        </div>
    );
};

export default TestAlertButton;