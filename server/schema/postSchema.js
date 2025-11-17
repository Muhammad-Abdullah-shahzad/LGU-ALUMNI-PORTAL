import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    postId: {type: Integer, required: true, unique: true},
    authorId: {type: Integer, required: true},
    header: {type: String, required: true},
    likes: {type: Integer, required: true},
    commentCount: {type: Integer, required: true},
    content: {type: String, required: true},
    createdAt: {type: Date, default: Date.now, required: true},
  },
  { strict: false, timestamps: true }  // FULL FLEXIBILITY
);

export default mongoose.model("Post", postSchema);
