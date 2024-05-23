import categoryModel from "./category.js";

/*mongoose.set("debug", true);

mongoose
  .connect("mongodb://localhost:27017/tasks", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .catch((error) => console.log(error));*/

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

export default {
  addCategory,
  getCategories,
  findCategoryById,
  //   findCategoryByName,
  removeCategory,
  addTaskToCategory
};
