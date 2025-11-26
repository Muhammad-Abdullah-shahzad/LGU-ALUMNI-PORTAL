const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  key: String,           // e.g. "plo1"
  question: String,      // actual text
  answer: String         // selected rating
});

const GraduateExitSurveySchema = new mongoose.Schema({
alumniId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
,
  department: { type: String, required: true },
  degree: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  participation: { type: String, required: true },

  questions: [QuestionSchema],  // 👈 IMPORTANT — ARRAY OF OBJECTS

  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("GraduateExitSurvey", GraduateExitSurveySchema);
