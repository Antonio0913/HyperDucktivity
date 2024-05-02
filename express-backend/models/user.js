import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    }
    // ,
    // content: {
    //   type: String,
    //   required: true,
    //   trim: true,
    //   validate(value) {
    //     if (value.length < 2)
    //       throw new Error("Invalid job, must be at least 2 characters.");
    //   },
    // },
  },
  { collection: "tasks_list" }
);

const User = mongoose.model("Task", UserSchema);

export default User;