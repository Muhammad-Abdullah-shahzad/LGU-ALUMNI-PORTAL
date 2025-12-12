const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    // commentId: {type: Number, required: true, unique: true}, // Let MongoDB handle IDs
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    authorName: { type: String, required: true },
    authorProfileImage: { type: String },
    commentContent: { type: String, required: true },
    replies: [{
      authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      authorName: String,
      authorProfileImage: String,
      content: String,
      createdAt: { type: Date, default: Date.now }
    }],
    createdAt: { type: Date, default: Date.now },
  },
  { strict: false, timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);

