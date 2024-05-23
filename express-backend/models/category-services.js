import mongoose from "mongoose";
import categoryModel from "./category.js";

mongoose.set("debug", true);

mongoose
  .connect("mongodb://localhost:27017/tasks", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .catch((error) => console.log(error));

function getCategories(title) {
  let promise;
  promise = categoryModel.find().populate("taskList");
  //   if (title === undefined) {
  //     promise = categoryModel.find().populate("taskList");
  //   } else if (title) {
  //     promise = findCategoryByName(title);
  //   }
  return promise;
}

function findCategoryById(id) {
  return categoryModel.findById(id).populate("taskList");
}

function addCategory(category) {
  const categoryToAdd = new categoryModel(category);
  const promise = categoryToAdd.save();
  return promise;
}

function removeCategory(id) {
  return categoryModel.findByIdAndDelete(id);
}

function addTaskToCategory(categoryId, taskId) {
  return categoryModel
    .findByIdAndUpdate(
      categoryId,
      { $push: { taskList: taskId } },
      { new: true, useFindAndModify: false }
    )
    .populate("taskList");
}

const updateCategory = async (id, updatedFields) => {
  console.log(`Updating category with ID: ${id} with fields: ${JSON.stringify(updatedFields)}`);

  const updatedCategory = await categoryModel.findByIdAndUpdate(id, updatedFields, { new: true });
  if (!updatedCategory) {
    throw new Error("Category not found");
  }
  return updatedCategory;
};

export default {
  addCategory,
  getCategories,
  findCategoryById,
  //   findCategoryByName,
  removeCategory,
  addTaskToCategory,
  updateCategory
};
