import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    taskList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task"
      }
    ],
    color: {
      type: String,
      default: "#bb4910"
    }
  },

  { collection: "categories_list" }
);

const Category = mongoose.model("Category", CategorySchema);

export default Category;
