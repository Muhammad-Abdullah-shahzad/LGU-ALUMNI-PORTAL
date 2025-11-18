import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    commentId: {type: Number, required: true, unique: true},
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    authorProfileImage: {type: String, required: true},
    commentContent: {type: String, required: true},
    createdAt: {type: Date, default: Date.now, required: true},
  },
  { strict: false, timestamps: true }  // FULL FLEXIBILITY
);

export default mongoose.model("Comment", commentSchema);
