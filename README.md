Fullstack Developer Test

Project Overview

This project is divided into two main parts:

Backend - Developed using Node.js and Express.js.

Frontend - Developed using React.js.

1. Backend

The backend is built with Node.js and Express.js and uses MySQL as the database.

Prerequisites

Ensure you have the following installed on your system:

Node.js (Latest LTS version recommended)

MySQL Server

Installation & Setup

Clone the repository:

git clone <repository-url>
cd backend

Install dependencies:

npm install

Configure environment variables:
Create a .env file in the root of the backend directory and add the following content:

PORT=5000
JWT_SECRET=rootADCBDSGDLS


Run database migrations (if applicable):


Start the development server:

npm run dev

The backend will run at http://localhost:5000 as specified in the .env file.

2. Frontend

The frontend is built using React.js and interacts with the backend via API calls.

Prerequisites

Ensure you have the following installed:

Node.js (Latest version recommended)

Installation & Setup

Navigate to the frontend directory:

cd frontend

Install dependencies:

npm install

Configure environment variables:
Create a .env file in the root of the frontend directory and add the following content:

REACT_APP_BASE_URL=http://localhost:5000/api

Start the development server:

npm start

The frontend will be available at http://localhost:3000.

API Authentication & Access Control

Assumptions Made:

Only logged-in users are allowed to create properties.

Only logged-in users are allowed to view utility bills for a particular property.

Access to the above routes is restricted to authenticated users.

Additional Notes

Ensure that your MySQL server is running before starting the backend.

Use Postman or any API testing tool to test the backend endpoints.

The frontend communicates with the backend through the REACT_APP_BASE_URL.