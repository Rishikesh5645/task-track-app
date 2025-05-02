import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  completedAt: Date
});

const Task = mongoose.model('Task', TaskSchema);
export default Task;
