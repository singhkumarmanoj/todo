import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Prevent model overwrite on hot reload
export default mongoose.models.Task || mongoose.model("Task", taskSchema);
