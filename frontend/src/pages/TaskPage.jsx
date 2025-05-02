import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import API from '../services/api';

function TaskPage() {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo'
  });

  // Fetch tasks for this project
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // GET /api/tasks/project/:projectId
        const response = await API.get(`/tasks/project/${projectId}`);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, [projectId]);

  // Handle form inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Create new task
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // POST /api/tasks/:projectId
      const response = await API.post(`/tasks/${projectId}`, {
        project: projectId,
        ...formData
      });
      setTasks((ts) => [...ts, response.data]);
      setFormData({ title: '', description: '', status: 'todo' });
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to create task');
    }
  };

  // Delete a task
  const handleDelete = async (taskId) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      // DELETE /api/tasks/:id
      await API.delete(`/tasks/${taskId}`);
      setTasks((ts) => ts.filter((t) => t._id !== taskId));
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete task');
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Tasks</h1>

      {/* Create Task Form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-lg"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-lg"
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
        >
          <option value="todo">To Do</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
        >
          Add Task
        </button>
      </form>

      {/* Task List */}
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="border rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold text-lg">{task.title}</h3>
              <p className="text-sm text-gray-600">{task.description}</p>
              <span className="text-sm font-medium text-blue-600">
                Status: {task.status}
              </span>
            </div>
            <div className="space-x-2">
              <Link
                to={`/tasks/${task._id}/edit`}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(task._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskPage;
