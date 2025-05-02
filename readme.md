Create a Task tracker application where a user can track progress on a project.
The System can have multiple users and each user can have up to 4 projects.

The user should be able to:
1. Signup
2. Login
3. Create a project.
4. Create a task.
5. Read as Task.
6. Update a Task.
7. Delete a Task.
8. 
Each User should have the following information:
1. Email.
2. Password.
3. Name.
4. Country.
5. 
Each task should contain:
1. Title.
2. Description.
3. Status to track progress.
4. Date of creation, completion.
5. 
Your task is to create this application using ExpressJS, ReactJS, MongoDB/PostgreSQL. Implement
authentication (JWT) with proper data encapsulation while maintaining high code quality and following
best practices.


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
