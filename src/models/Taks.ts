import mongoose, { Schema } from 'mongoose';
import { ITask } from '../interfaces/TaskInterfaces';

const TaskSchema: Schema<ITask> = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    created_at: {
      type: Date,
      required: true,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    collection: 'tasks',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

const Task = mongoose.model<ITask>('Task', TaskSchema);

export default Task;