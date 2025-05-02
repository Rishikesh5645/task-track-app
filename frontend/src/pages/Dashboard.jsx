import { useEffect, useState } from 'react';
import API from '../services/api';

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ name: '', description: '' });

  useEffect(() => {
    API.get('/projects')
      .then(res => setProjects(res.data))
      .catch(err => console.error(err));
  }, []);

  const createProject = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/projects', form);
      setProjects([...projects, res.data]);
      setForm({ name: '', description: '' });
    } catch (err) {
      alert('Failed to create project (max 4 allowed).');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Your Projects</h1>

        {/* Create Project Form */}
        <form onSubmit={createProject} className="bg-white p-6 rounded shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Add New Project</h2>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Project Name"
              required
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
            <textarea
              placeholder="Project Description"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Create Project
            </button>
          </div>
        </form>

        {/* Project Cards */}
        <div className="grid sm:grid-cols-2 gap-4">
          {projects.map(project => (
            <div key={project._id} className="bg-white p-4 rounded shadow border">
              <h3 className="text-lg font-bold text-gray-800">{project.name}</h3>
              <p className="text-gray-600 mt-1">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
