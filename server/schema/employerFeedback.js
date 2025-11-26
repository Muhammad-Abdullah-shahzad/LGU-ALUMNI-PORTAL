const mongoose = require("mongoose");

const EmployerFeedbackSchema = new mongoose.Schema({
    alumniId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    ,
  companyName: { type: String, required: true },
  employerName: { type: String, required: true },
  designation: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },

  interneeName: { type: String, required: true },
  interneeDiscipline: { type: String, required: true },
  totalInterneeCount: { type: Number, required: true },
  departmentInternCount: { type: String, required: true }, // could be range like "1-5"

  // Department-wise intern count
  departmentCounts: {
    ai: { type: Number, default: 0 },
    devDesign: { type: Number, default: 0 },
    marketing: { type: Number, default: 0 },
    graphics: { type: Number, default: 0 },
    analytics: { type: Number, default: 0 },
    cyber: { type: Number, default: 0 },
    technical: { type: Number, default: 0 },
    it: { type: Number, default: 0 },
    rnd: { type: Number, default: 0 },
    other: { type: Number, default: 0 }
  },

  // PLO ratings
  ploRatings: {
    plo3_problemSolving: { type: String, default: "" },
    plo2_dataAnalysis: { type: String, default: "" },
    plo1_theoryToPractice: { type: String, default: "" },
    plo4_judgement: { type: String, default: "" },
    plo5_technicalSkills: { type: String, default: "" },
    plo6_teamwork: { type: String, default: "" },
    plo7_communication: { type: String, default: "" },
    plo8_societalAwareness: { type: String, default: "" },
    plo9_ethics: { type: String, default: "" },
    plo10_independentThinking: { type: String, default: "" },
    plo10_outOfBox: { type: String, default: "" }
  },

  comments: { type: String, default: "" },

  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("EmployerFeedback", EmployerFeedbackSchema);
