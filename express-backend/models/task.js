import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    dueDate: {
      type: Date,
      required: false
    },
    isPriority: {
      type: Boolean,
      required: true,
      default: false
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
  },
  { collection: "tasks_list" }
);

const Task = mongoose.model("Task", TaskSchema);

export default Task;