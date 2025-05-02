// backend/routes/project.js

import express from 'express';
import Project from '../models/Project.js';
import User from '../models/User.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Create project (limit to 4 projects per user)
router.post('/', verifyToken, async (req, res) => {
  const { name } = req.body;

  try {
    // 1. Fetch the user (from JWT payload)
    const user = await User.findById(req.userId);

    // 2. Enforce max 4 projects
    if (user.projects.length >= 4) {
      return res.status(400).json({ error: 'You can only have 4 projects' });
    }

    // 3. Create & save project
    const project = new Project({ name, userId: req.userId });
    await project.save();

    // 4. Add to user's projects array
    user.projects.push(project._id);
    await user.save();

    res.status(201).json({ message: 'Project created', project });
  } catch (err) {
    console.error('Project creation failed:', err);
    res.status(500).json({ error: 'Project creation failed', message: err.message });
  }
});

// Fetch user's projects
router.get('/', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('projects');
    res.status(200).json(user.projects);
  } catch (err) {
    console.error('Fetch projects failed:', err);
    res.status(500).json({ error: 'Failed to fetch projects', message: err.message });
  }
});

export default router;
