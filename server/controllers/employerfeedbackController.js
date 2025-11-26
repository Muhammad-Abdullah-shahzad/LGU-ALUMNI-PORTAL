const EmployerFeedback = require("../schema/employerFeedback");

// Submit Employer Feedback
exports.submitEmployerFeedback = async (req, res) => {
  try {
    const {

      companyName,
      employerName,
      designation,
      email,
      phone,
      interneeName,
      interneeDiscipline,
      totalInterneeCount,
      departmentInternCount,
      ai,
      devDesign,
      marketing,
      graphics,
      analytics,
      cyber,
      technical,
      it,
      rnd,
      other,
      plo3_problemSolving,
      plo2_dataAnalysis,
      plo1_theoryToPractice,
      plo4_judgement,
      plo5_technicalSkills,
      plo6_teamwork,
      plo7_communication,
      plo8_societalAwareness,
      plo9_ethics,
      plo10_independentThinking,
      plo10_outOfBox,
      comments
    } = req.body;

    // Prepare department counts object
    const departmentCounts = {
      ai, devDesign, marketing, graphics, analytics, cyber, technical, it, rnd, other
    };

    // Prepare PLO ratings object
    const ploRatings = {
      plo3_problemSolving,
      plo2_dataAnalysis,
      plo1_theoryToPractice,
      plo4_judgement,
      plo5_technicalSkills,
      plo6_teamwork,
      plo7_communication,
      plo8_societalAwareness,
      plo9_ethics,
      plo10_independentThinking,
      plo10_outOfBox
    };

    const feedback = new EmployerFeedback({
      alumniId:req.user.id
      ,
      companyName,
      employerName,
      designation,
      email,
      phone,
      interneeName,
      interneeDiscipline,
      totalInterneeCount,
      departmentInternCount,
      departmentCounts,
      ploRatings,
      comments
    });

    await feedback.save();

    res.status(201).json({
      success: true,
      message: "Employer Feedback submitted successfully",
      data: feedback
    });

  } catch (error) {
    console.error("Employer Feedback Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.getEmployerFeedbacks = async (req, res) => {
  try {
    const feedbacks = await EmployerFeedback.find()
      .populate("alumniId", "fullName email phone") // fetch only these user fields
      .exec();

    res.status(200).json({
      success: true,
      data: feedbacks
    });
  } catch (error) {
    console.error("Get Employer Feedback Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
