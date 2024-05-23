import mongoose from 'mongoose';
import userModel from './userModel.js';

mongoose.set('debug', true);

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

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByUsername,
  removeUser,
};
