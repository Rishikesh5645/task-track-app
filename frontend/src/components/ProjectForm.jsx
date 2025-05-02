import { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

function ProjectForm() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/projects', { name });
      navigate('/projects');  // Redirect to Projects list
    } catch (error) {
      alert('Error creating project');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <button type="submit">Create Project</button>
    </form>
  );
}

export default ProjectForm;
