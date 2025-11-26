const mongoose = require("mongoose");

const Annex1DSchema = new mongoose.Schema({
   alumniId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    ,
  // Basic Program Info
  program: { type: String, required: true },
  department: { type: String, required: true },

  // Self Assessment — dynamic ratings stored as key/value
  selfAssessment: {
    type: Map,
    of: String, // Excellent / Good / Poor etc.
    default: {}
  },

  generalComments: { type: String, default: "" },

  // Department Standing — dynamic ratings
  departmentStanding: {
    type: Map,
    of: String,
    default: {}
  },

  careerOpportunities: { type: String, default: "" },

  // Alumni Information
  name: { type: String, required: true },
  organizationName: { type: String, default: "" },
  position: { type: String, default: "" },
  graduationYear: { type: String, default: "" },
  email: { type: String, required: true },
  telephone: { type: String, default: "" },

  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Annex1DAlumniSurvey", Annex1DSchema);
