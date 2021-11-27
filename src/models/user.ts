import mongoose from "mongoose";
import { composeWithMongoose } from "graphql-compose-mongoose";
import timestamps from "mongoose-timestamp";

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.plugin(timestamps);
UserSchema.index({ createdAt: 1, updatedAt: 1 });

export const UserModel = mongoose.model("User", UserSchema);
export const UserTC = composeWithMongoose(UserModel);
