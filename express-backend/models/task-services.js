import taskModel from "./task.js";

/*mongoose.set("debug", true);

mongoose
  .connect("mongodb://localhost:27017/tasks", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));*/

function getTasks(title) {
  let promise;
  if (title === undefined) {
    promise = taskModel.find();
  } else if (title) {
    promise = findTaskByName(title);
  }
  return promise;
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

export default {
  addTask,
  getTasks,
  findTaskById,
  findTaskByName,
  removeTask
};
