import { useState,useEffect } from 'react';
import API from '../services/api';
import { useParams,useNavigate } from 'react-router-dom';

function TaskForm({ projectId }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('todo');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post(`/tasks/${projectId}`, { title, description, status });
      navigate(`/projects/${projectId}`);  // Redirect to project page
    } catch (error) {
      alert('Error creating task');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Status</label>
        <select
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="todo">To Do</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <button type="submit">Create Task</button>
    </form>
  );
}

export default TaskForm;
