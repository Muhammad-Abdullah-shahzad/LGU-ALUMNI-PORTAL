const mongoose = require("mongoose");

const ERPAlumniData = new mongoose.Schema(
  {
    StdRollNo:String,
    StudentName:String,
    FatherName:String,
    ClassSection:String,
    degreeid:String,
    JoiningSession:String,
    createdAt: { type: Date, default: Date.now },
  },
  { strict: false, timestamps: true }  // FULL FLEXIBILITY
);

module.exports = mongoose.model("ERPAlumniData", ERPAlumniData);
