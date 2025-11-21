const mongoose= require("mongoose")

const postSchema = new mongoose.Schema(
  {
    // postId: {type: Number, unique: true},
    // authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    authorName: {type: String},
    likes: {type: Number},
    commentCount: {type: Number},
    content: {type: String},
    createdAt: {type: Date, default: Date.now, required: true},
    postStatus: {
      type: String,
      enum: ["approved", "pending", "rejected"],
    },
    headerImageURL:String,
    authorAvatarURL:String,
    authorTitle:String,
    postLink:String,
    postTitle:String,
    postContent:String
  },
  { strict: false, timestamps: true }  // FULL FLEXIBILITY
);

module.exports= mongoose.model("Post", postSchema);
