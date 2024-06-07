import userModel from "./userModel.js";

function getUsers() {
  return userModel.find();
}

function findUserById(id) {
  return userModel.findById(id);
}

function addUser(user) {
  const userToAdd = new userModel(user);
  return userToAdd.save();
}

function findUserByUsername(username) {
  return userModel.findOne({ username: username });
}

function removeUser(id) {
  return userModel.findByIdAndDelete(id);
}

function findUserByClerkUserId(clerkUserId) {
  return userModel.findOne({ clerkUserId: clerkUserId });
}
export default {
  addUser,
  getUsers,
  findUserById,
  findUserByUsername,
  removeUser,
  findUserByClerkUserId
};
