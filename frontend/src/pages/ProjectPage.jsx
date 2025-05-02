import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';

function ProjectPage() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState('');

  // Fetch projects on mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await API.get('/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  // Handle project creation
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/projects', { name });
      setProjects([...projects, response.data.project]);
      setName('');
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to create project');
    }
  };

  // Handle project deletion
  const handleDelete = async (projectId) => {
    try {
      await API.delete(`/projects/${projectId}`);
      setProjects(projects.filter((p) => p._id !== projectId));
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Your Projects</h1>

      {/* Project creation form */}
      <form onSubmit={handleCreate} className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="flex-1 px-3 py-2 border rounded-lg"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Create
        </button>
      </form>

      {/* Project list */}
      <ul className="space-y-4">
        {projects.map((project) => (
          <li
            key={project._id}
            className="flex justify-between items-center border p-4 rounded-lg"
          >
            <Link
              to={`/projects/${project._id}`}
              className="text-lg text-blue-600 hover:underline"
            >
              {project.name}
            </Link>
            <button
              onClick={() => handleDelete(project._id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectPage;
