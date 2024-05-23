import mongoose from 'mongoose';

const ThemeSchema = new mongoose.Schema(
  {
    backgroundColor: {
      type: String,
      required: true,
    },
    fontColor: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tasks: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task'
    }],
  },
  { collection: 'themes_list' }
);

const Theme = mongoose.model('Theme', ThemeSchema);

export default Theme;
