const Annex1D = require("../schema/Anex1DSchema");

// POST /surveys/annex1D

exports.submitAnnex1D = async (req, res) => {
    try {

        const data = req.body;

        const survey = new Annex1D({ ...data, alumniId: req.user.id });
        await survey.save();

        res.status(201).json({
            success: true,
            message: "Annex-1D Alumni Survey submitted successfully",
            survey
        });

    } catch (error) {

        console.error("Annex1D Submit Error:", error);

        res.status(500).json({
            success: false,
            message: "Server error",
        });

    }

};

exports.getAllAnnex1D = async (req, res) => {
  try {
    const surveys = await Annex1D.find()
      .populate("alumniId", "fullName email phone department rollno") // select required user fields
      .sort({ submittedAt: -1 });

    res.status(200).json({
      success: true,
      count: surveys.length,
      surveys
    });

  } catch (error) {
    console.error("Fetch Annex1D Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
