import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    themes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Theme'
    }],
  },
  { collection: 'users_list' }
);

const User = mongoose.model('User', UserSchema);

export default User;
