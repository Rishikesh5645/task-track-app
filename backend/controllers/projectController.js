import Project from '../models/Project.js';

export const createProject = async (req, res) => {
  try {
    const user = await User.findById(userId).populate('projects');
if (user.projects.length >= 4) {
  return res.status(400).json({ error: 'Project limit reached (4)' });
}

    const { name, description } = req.body;
    const newProject = await Project.create({ name, description, user: req.userId });

    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ message: 'Project creation failed', error: err.message });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.userId });
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch projects', error: err.message });
  }
};
