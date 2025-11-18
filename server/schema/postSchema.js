const mongoose= require("mongoose")

const postSchema = new mongoose.Schema(
  {
    postId: {type: Number, required: true, unique: true},
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    header: {type: String, required: true},
    likes: {type: Number, required: true},
    commentCount: {type: Number, required: true},
    content: {type: String, required: true},
    createdAt: {type: Date, default: Date.now, required: true},
    postStatus: {
      type: String,
      enum: ["approved", "pending", "rejected"],
      required: true
    },
  },
  { strict: false, timestamps: true }  // FULL FLEXIBILITY
);

module.exports= mongoose.model("Post", postSchema);
