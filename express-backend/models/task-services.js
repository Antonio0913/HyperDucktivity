import taskModel from "./task.js";

function getTasks(query) {
  let promise;
  if (query.title) {
    promise = findTaskByName(query.title);
  } else if (query.category) {
    promise = findTaskByCategory(query.category);
  } else {
    promise = taskModel.find();
  }
  return promise;
}

function findTaskByCategory(categoryId) {
  return taskModel.find({ category: categoryId });
}

function findTaskById(id) {
  return taskModel.findById(id);
}

function addTask(task) {
  const taskToAdd = new taskModel(task);
  const promise = taskToAdd.save();
  return promise;
}

function findTaskByName(title) {
  return taskModel.find({ title: title });
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
