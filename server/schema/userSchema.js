const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    cnic: String,
    batch: String,
    degree: String,
    rollNo: Number,
    department: String,
    details: {type: Array},
    role: {
      type: String,
      enum: ["admin", "coordinator", "president", "vice_president", "alumni"],
      required: true
    },
    createdAt: { type: Date, default: Date.now },
    userStatus: {
      type: String,
      enum: ["approved", "pending", "rejected"],
      required: true
    },
  },
  { strict: false, timestamps: true }  // FULL FLEXIBILITY
);

module.exports = mongoose.model("User", userSchema);
