import mongoose from "mongoose";
import { composeWithMongoose } from "graphql-compose-mongoose";
import timestamps from "mongoose-timestamp";

const Schema = mongoose.Schema;
const PostSchema = new Schema({
  user_id: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

PostSchema.plugin(timestamps);
PostSchema.index({ createdAt: 1, updatedAt: 1 });

export const PostModel = mongoose.model("Post", PostSchema);
export const PostTC = composeWithMongoose(PostModel);
