import mongoose from "mongoose";

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: String,
  age: Number,
  date: {
    default: Date.now,
    type: Date,
  },
});
export const UserModel = mongoose.model("users", UserSchema);
