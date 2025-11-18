import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    notificationId: {type: Integer, required: true, unique: true},
    notificationAuthor: {
      type: String,
      enum: ["admin", "coordinator", "president", "vice_president"],
      required: true
    },
    notificationType: {
      type: String,
      enum: ["post", "alumniRegiter", "dataChangeApproval", "postApproval", "commentDiscussion"],
      required: true
    },
    notificationContent: {type: String, required: true},
    createdAt: {type: Date, default: Date.now, required: true},
  },
  { strict: false, timestamps: true }  // FULL FLEXIBILITY
);

export default mongoose.model("Notification", notificationSchema);
