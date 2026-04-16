🧠 Overview

This is a Trello-inspired task management application that allows users to organize their work using boards, lists, and cards.
The project demonstrates a complete full-stack workflow including:
Frontend UI
Backend APIs
Database operations
Deployment


🌐 Live Demo
🔗 Frontend (Vercel): (https://trackly-lime.vercel.app/)
🔗 Backend (Railway): trackly-production-53ee.up.railway.app/api


🛠️ Tech Stack

Frontend
React (Create React App)
CSS (custom styling)
Axios (API calls)
Drag & Drop library

Backend
Node.js
Express.js
Database
SQL (Sequelize ORM)

Deployment

Vercel (Frontend)
Railway (Backend and Database)


⚙️ Features

📌 Create and manage lists (To Do, In Progress, Done)
📝 Add, edit, delete cards
🔄 Drag and drop cards between lists
📅 Optional due dates for tasks
📡 Backend API integration
🌐 Fully deployed (no local setup needed for demo)


🏗️ Project Structure

frontend/   → React UI
backend/    → Express server + APIs
database/   → Models & relations


🔄 Application Flow

User interacts with UI (React)
API request is sent to backend
Backend processes request via Express
Sequelize interacts with database
Response is returned
UI updates dynamically


⚙️ Local Setup (Optional)

If you want to run locally:
Backend
cd backend
npm install
npm run dev

Frontend
cd frontend
npm install
npm start


🔑 Key Concepts Learned
REST API design
Component-based architecture
State management in React
Database relationships (List → Cards)
Deployment pipeline (Frontend + Backend separation)


👩‍💻 Author
Developed as part of a full-stack learning project.
