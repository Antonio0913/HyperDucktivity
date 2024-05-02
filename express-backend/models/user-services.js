import mongoose from "mongoose";
import userModel from "./user.js";

mongoose.set("debug", true);

mongoose
  .connect("mongodb://localhost:27017/tasks", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

function getUsers(title) {
  let promise;
  if (title === undefined) {
    promise = userModel.find();
  } else if (title) {
    promise = findUserByName(title);
  }
  return promise;
}

function findUserById(id) {
  return userModel.findById(id);
}

function addUser(task) {
  const userToAdd = new userModel(task);
  const promise = userToAdd.save();
  return promise;
}

function findUserByName(title) {
  return userModel.find({ title: title });
}

function findUserByJob(job) {
  return userModel.find({ job: job });
}

function findUserByNameAndJob(name, job){
  return userModel.find({ name : name, job : job});
}

function removeUser(id){
  return userModel.findByIdAndDelete(id);

}

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
  removeUser,
  findUserByNameAndJob, 
};