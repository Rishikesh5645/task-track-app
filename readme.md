# Task Tracker App

A full-stack task/project management app built with MERN (MongoDB, Express, React, Node.js).

##  Features

- Signup & Login with JWT
- Create up to 4 projects per user
- Create, update, and delete tasks
- Track task status (todo/in progress/completed)
- Auto logout on token expiration (optional)

##  Tech Stack

- Backend: Node.js, Express, MongoDB, Mongoose, JWT
- Frontend: React, Axios, Tailwind CSS
- Auth: JWT-based

##  Local Setup

### 1. Clone & Setup Backend

```bash
cd backend
npm install
cp .env.example .env  # add Mongo URI & JWT_SECRET
npm start

### 2. Clone & Setup Frontend
cd frontend
npm install
cp .env.example .env  # add VITE_API_URL (e.g., http://localhost:5050/api)
npm run dev
```
