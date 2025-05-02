import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ProjectPage from './pages/ProjectPage';
import TaskPage from './pages/TaskPage';
import EditTaskForm from './components/EditTaskForm';

// A simple wrapper that redirects to /login if no token is present
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <PrivateRoute>
              <ProjectPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/projects/:projectId"
          element={
            <PrivateRoute>
              <TaskPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/tasks/:taskId/edit"
          element={
            <PrivateRoute>
              <EditTaskForm />
            </PrivateRoute>
          }
        />

        {/* Catch‑all: redirect unknown routes to dashboard if logged in, otherwise to login */}
        <Route
          path="*"
          element={
            <PrivateRoute>
              <Navigate to="/" replace />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
