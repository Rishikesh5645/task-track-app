import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';

function EditTaskForm() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'todo',
    project: ''
  });

  // Fetch the single task
  useEffect(() => {
    const fetchTask = async () => {
      try {
        // Assuming you have a GET /api/tasks/:id endpoint
        const response = await API.get(`/tasks/${taskId}`);
        setTask(response.data);
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };
    fetchTask();
  }, [taskId]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // PUT /api/tasks/:id
      const response = await API.put(`/tasks/${taskId}`, {
        title: task.title,
        description: task.description,
        status: task.status
      });
      // Navigate back to the project’s task list
      navigate(`/projects/${response.data.project}`);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update task');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Edit Task</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg"
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-700">Status</label>
          <select
            name="status"
            value={task.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="todo">To Do</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
        >
          Update Task
        </button>
      </form>
    </div>
  );
}

export default EditTaskForm;
