import taskModel from "./task.js";

/*mongoose.set("debug", true);

mongoose
  .connect("mongodb://localhost:27017/tasks", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));*/

function getTasks(query) {
  let promise;
  if (query.title) {
    promise = findTaskByName(query.title).populate('category', 'color');
  } else if (query.category) {
    promise = findTaskByCategory(query.category);
  } else {
    promise = taskModel.find().populate('category', 'color');
  }
  return promise;
}

function findTaskByCategory(categoryId) {
  return taskModel.find({ category: categoryId }).populate('category', 'color');
}

function findTaskById(id) {
  return taskModel.findById(id).populate('category', 'color');
}

function addTask(task) {
  const taskToAdd = new taskModel(task);
  const promise = taskToAdd.save();
  return promise;
}

function findTaskByName(title) {
  return taskModel.find({ title: title }).populate('category', 'color');
}

function removeTask(id) {
  return taskModel.findByIdAndDelete(id);
}

const updateTask = async (id, updatedFields) => {
  console.log(
    `Updating Task with ID: ${id} with fields: ${JSON.stringify(
      updatedFields
    )}`
  );
  try {
    const updatedTask = await taskModel.findByIdAndUpdate(
      id,
      updatedFields,
      { new: true }
    );
    return updatedTask;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

export default {
  addTask,
  getTasks,
  findTaskById,
  findTaskByName,
  removeTask,
  findTaskByCategory,
  updateTask
};
