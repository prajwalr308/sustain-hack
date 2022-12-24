import { ObjectID } from "bson";
import mongoose from "mongoose";

export interface Post {
  title: string;
  content: string;
  file: string;
  status: string;
  address: string;
}
const PostScheme = new mongoose.Schema({
  title: String,
  content: String,
  file: String,
  status: String,
  address: String,
});
const PostModel= mongoose.models.Post as mongoose.Model<Post> || mongoose.model("Post", PostScheme);
export default PostModel;