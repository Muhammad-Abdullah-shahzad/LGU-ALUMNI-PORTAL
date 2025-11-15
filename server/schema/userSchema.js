import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    role: {
      type: String,
      enum: ["admin", "coordinator", "president", "vice_president", "alumni"],
      required: true
    },

    status: { type: Boolean, default: true },
  },
  { strict: false, timestamps: true }  // FULL FLEXIBILITY
);

export default mongoose.model("User", userSchema);
