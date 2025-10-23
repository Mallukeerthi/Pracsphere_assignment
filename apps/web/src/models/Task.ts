import mongoose, { Schema, models, model } from 'mongoose';

const TaskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    status: { type: String, enum: ['pending', 'done', 'completed'], default: 'pending' },
    userEmail: { type: String, required: true, index: true }, // who owns this task
  },
  { timestamps: true }
);

export default models.Task || model('Task', TaskSchema);