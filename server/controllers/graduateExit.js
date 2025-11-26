const GraduateExitSurvey = require("../models/exitSurveyModel");

// PLO Questions mapped to frontend keys
const PLO_QUESTIONS = {
  plo1: "Prepared to enter professional life [PLO-1]",
  plo2: "Analytical & problem-solving skills [PLO-2]",
  plo3: "Analyze complex problems [PLO-3]",
  plo5: "Use modern tools & techniques [PLO-5]",
  plo8: "Societal/health/safety awareness [PLO-8]",
  plo4: "Environmental & sustainable solutions [PLO-4]",
  plo9: "Ethical principles understanding [PLO-9]",
  plo6: "Work individually & in teams [PLO-6]",
  plo7: "Effective communication [PLO-7]",
  plo10: "Lifelong learning & innovation [PLO-10]"
};

exports.submitGraduateExitSurvey = async (req, res) => {
  try {
    const {
      alumniId=req.user.id,
      department,
      degree,
      fullName,
      email,
      phone,
      participation,
      ...ploFields
    } = req.body;

    // Convert PLO fields into questions[] array
    const questions = Object.keys(PLO_QUESTIONS).map((key) => ({
      key,
      question: PLO_QUESTIONS[key],
      answer: ploFields[key] || ""
    }));

    const survey = new GraduateExitSurvey({
      alumniId,
      department,
      degree,
      fullName,
      email,
      phone,
      participation,
      questions
    });

    await survey.save();

    res.status(201).json({
      success: true,
      message: "Graduate Exit Survey submitted successfully",
      data: survey
    });

  } catch (error) {
    console.error("Survey Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};


exports.getAllSurveyData = async (req, res) => {
  try {
    const surveys = await GraduateExitSurvey.find()
      .populate("alumniId", "fullName email phone") // select fields from users
      .exec();

    res.status(200).json({
      success: true,
      data: surveys
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

