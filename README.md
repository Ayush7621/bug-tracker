# 🐞 Bug Tracker – Fullstack Project

A modern, fullstack bug-tracking and project management application, inspired by Jira. Built with React, Node.js, Express, and MongoDB.

---

## 🚀 Live Demo

- 🔗 Frontend: https://bug-tracker-sepia-chi.vercel.app/
- 🔗 Backend API: https://bug-tracker-zljg.onrender.com
- 🔗 MongoDB Atlas Dashboard: https://cloud.mongodb.com/v2/6843e58aed500f4b78336428#/overview

---

## 🧰 Tech Stack

- Frontend: React + Tailwind CSS + React Router
- Backend: Node.js + Express
- Database: MongoDB Atlas
- Authentication: JWT (JSON Web Tokens)
- Deployment: Vercel (frontend) & Render (backend)

---

## ✨ Features

- 🔐 User Registration & Login (JWT Auth)
- 🗂 Create & Manage Projects
- 🎫 Create, Assign, and Update Tickets
- 📋 Kanban-style board with drag & drop (`react-beautiful-dnd`)
- 👥 Add Team Members to Projects
- 🧑‍💻 Logged-in user’s name shown in dashboard
- 🧼 Clean UI with TailwindCSS

---

## 📁 Folder Structure

bug-tracker/
├── client/          # React frontend
└── server/          # Express backend

---

## ⚙️ Setup Instructions (Local)

1. Clone the Repository:
   git clone https://github.com/Ayush7621/bug-tracker.git
   cd bug-tracker

2. Backend Setup (Render-ready):
   cd server
   npm install

   Create `.env` in `/server`:
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret

3. Frontend Setup:
   cd ../client
   npm install

   Create `.env` in `/client`:
   REACT_APP_API_URL=https://bug-tracker-zljg.onrender.com

4. Run Locally:
   # Terminal 1 (backend)
   cd server && npm start

   # Terminal 2 (frontend)
   cd client && npm start

---

## 🧠 Author

Ayush  
GitHub: https://github.com/Ayush7621

---

## 📌 License

This project is licensed for educational & internship purposes.  
For commercial use, please ask for permission.