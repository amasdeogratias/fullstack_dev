FULLSTACK DEVELOPER TEST
The project is divided into two parts.
1: Backend
2: Frontend
1: Backend
The backend part is developed using Nodejs and Express js as the framework.
The database used in the backend part is MySQL Database.
Requirements for Backend part
-Node js
Installation:
npm install
when everything is setup, run npm run dev to run the project at a specified port as shown in .env file
.env file’s content for backend
PORT=5000
JWT_SECRET=rootADCBDSGDLS

2: FRONTEND
Frontend is developed using React  js 
.env file’s content for frontend
REACT_APP_BASE_URL=http://localhost:5000/api
Assumptions made:
1: Only logged in user(s) is allowed to create the property
2: Only logged in user(s) is allowed to view utility bills for particular property
3: Access to the above routes is restricted to only logged in users
