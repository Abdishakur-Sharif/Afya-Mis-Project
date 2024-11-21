Hospital Management System (HMS)
Project Overview
The Hospital Management System (HMS) is a web-based solution designed to streamline hospital operations such as patient management, doctor scheduling, lab test processing, payment handling, and MPESA payment integration. The system is structured into two main components:

Frontend: Built using React, Vite, and Material UI to provide an intuitive and responsive user interface.
Backend: Developed with Flask and SQLAlchemy to handle database interactions, user requests, and MPESA payment processing.
Technologies Used
Frontend
React: A JavaScript library for building dynamic user interfaces.
Vite: A fast development tool that optimizes frontend build processes.
Material UI: A comprehensive library of UI components for React applications.
Axios: Promise-based HTTP client to interact with the backend API.
Backend
Flask: A lightweight Python web framework for creating RESTful APIs.
SQLAlchemy: Object Relational Mapper (ORM) for database management.
SQLite / PostgreSQL: Relational databases used for persistent data storage.
MPESA API: API integration for processing payments via MPESA.
Datetime: Python module for handling date and time operations.
Installation Guide
Frontend Setup
Clone the repository:

bash

Copy code

`git clone https://git@github.com:Abdishakur-Sharif/Afya-Mis-Project.git
cd Afya-Mis-Project

Install project dependencies:

bash

Copy code

npm install

Start the development server:

bash

Copy code

npm run dev

The frontend will be available at https://afya-mis-project.vercel.app/

Backend Setup
Clone the repository (if not already done):

bash

Copy code

`git clone https://github.com/git@github.com:Abdishakur-Sharif/Afya-Mis-Backend.git
cd Afya-Mis-Backend

Create and activate a virtual environment:

bash

Copy code

python3 -m venv venv source venv/bin/activate # For macOS/Linux venv\Scripts\activate # For Windows

Install required Python dependencies:

bash

Copy code

pip install -r requirements.txt

Set up the database (SQLite/PostgreSQL):

bash

Copy code

flask db init flask db migrate flask db upgrade

Start the Flask server:

bash

Copy code

flask run

The backend API will be accessible at https://afya-mis-backend-6.onrender.com/

API Endpoints
Lab Technician Management
GET /lab_techs/<int:lab_tech_id>: Retrieve lab technician details by ID.
POST /lab_techs: Create a new lab technician record.
PATCH /lab_techs/<int:id>: Update details for a specific lab technician.
DELETE /lab_techs/<int:id>: Delete a lab technician record.
Test Report Management
GET /test_reports: Fetch all test reports or filter by test ID.
POST /test_reports: Create a new test report for a specific patient/test.
Payment Management
GET /payments: Get all payment records.
GET /payments/<int:payment_id>: Get payment details by ID.
POST /payments: Process a new payment.

POST /payments/mpesa: Initiate an MPESA payment request.
Frontend Features
Dashboard: A comprehensive overview of hospital data, including patient counts, doctor schedules, and test report status.
Lab Technician Management: Ability to add, edit, and remove lab technicians.
Test Report Management: View, create, and manage test reports.
Payment System: View payment history and initiate payments using MPESA.
Backend Features
User Management: Full CRUD functionality for lab technician records.
Test Report Management: Ability to generate and view test reports.
MPESA Integration: Securely process payments via MPESA, including payment request initiation and callback handling.
MPESA Integration
The MPESA API is integrated into the backend to enable payments directly through the MPESA system. To configure MPESA payment functionality:

Configure MPESA API Credentials:

Set the following environment variables for MPESA integration:

bash

Copy code

MPESA_CONSUMER_KEY=your_mpesa_consumer_key MPESA_CONSUMER_SECRET=your_mpesa_consumer_secret MPESA_BASE_URL=https://sandbox.safaricom.co.ke

Initiate MPESA Payments:

Use the /payments/mpesa endpoint to initiate an MPESA payment request by providing the phone number, amount, and service.
Handle Payment Callback:

Set up a callback URL to receive responses from MPESA upon successful or failed transactions.
Environment Variables
To configure both the backend and the MPESA integration, create a .env file in the backend directory and define the following variables:

env

Copy code

FLASK_APP=app.py FLASK_ENV=development MPESA_CONSUMER_KEY=your_mpesa_consumer_key MPESA_CONSUMER_SECRET=your_mpesa_consumer_secret MPESA_BASE_URL=https://sandbox.safaricom.co.ke

Database Models
Lab Technician
id: Unique identifier for the lab technician (Primary Key).
name: Full name of the lab technician.
email: Email address for the lab technician.
phone_number: Contact number for the lab technician.
Test Report
id: Unique identifier for the test report (Primary Key).
test_id: Foreign key to the Test model.
result: Result of the test.
remarks: Any additional notes related to the test.
created_at: Timestamp indicating when the report was created.
Payment
id: Unique identifier for the payment (Primary Key).
patient_id: Foreign key linking to the Patient model.
amount: Total amount paid for services.
payment_method: Indicates the payment method (e.g., Cash, MPESA).
Testing
The backend has been designed to include test cases for endpoints and API integrations. You can run the tests using pytest or unittest to ensure functionality.

Example test cases:

Test creating and updating lab technicians.
Test creating test reports and associating them with patients.
Test payment processing via MPESA and the callback handling.
Contributing
We welcome contributions to improve the functionality and features of this project. Please follow the steps below to contribute:

Fork the repository to your GitHub account.
Create a new branch for your changes.
Implement your changes and ensure you write appropriate tests.
Submit a pull request detailing the changes made.
