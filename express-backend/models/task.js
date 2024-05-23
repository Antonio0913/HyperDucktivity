import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    // _id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     auto: true
    // },
    //dont think its needed
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      // validate(value) {
      //   if (value.length < 2)
      //     throw new Error("Invalid job, must be at least 2 characters.");
      // },
    },
    isPriority: {
      type: Boolean,
      required: true,
      default: false
    },
  },
  { collection: "tasks_list" }
);

const Task = mongoose.model("Task", TaskSchema);

export default Task;