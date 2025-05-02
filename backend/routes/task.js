import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import Task from '../models/Task.js';  // Ensure this path is correct
import Project from '../models/Project.js';
import { createTask, getTasksByProject, updateTask, deleteTask } from '../controllers/taskController.js';

const router = express.Router();

// Create Task
router.post('/:projectId', verifyToken, createTask);

// Get Tasks by Project
router.get('/project/:projectId', verifyToken, getTasksByProject);

// Update Task
router.put('/:id', verifyToken, updateTask);

// Delete Task
router.delete('/:id', verifyToken, deleteTask);

export default router;
