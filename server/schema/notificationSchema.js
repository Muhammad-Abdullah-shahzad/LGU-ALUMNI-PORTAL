import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    notificationId: { type: Integer, required: true, unique: true },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    notificationAuthor: {
      type: String,
      enum: ["admin", "coordinator", "president", "vice_president", "alumni"],
      required: true
    },
    notificationType: {
      type: String,
      enum: ["post", "alumniRegiter", "editAlumni", "deleteAlumni", "postApproval", "commentDiscussion"],
      required: true
    },
    // for posts
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    // for alumni registration
    alumniId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    // for change data approval
    updationData: { type: Object },
    deletionData: { type: Object },
    notificationContent: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, required: true },
  },
  { strict: false, timestamps: true }  // FULL FLEXIBILITY
);

export default mongoose.model("Notification", notificationSchema);

// Notification Info

//Admin
//post
//coordinator data change

//Coordinator
//post
//alumni registration approval
//post approval from vp/p
//data change request status  

// president
//post
//post approval status

// User
// post