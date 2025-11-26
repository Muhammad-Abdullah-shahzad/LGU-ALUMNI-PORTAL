const express = require("express");
const router = express.Router();
const { verifyToken } = require('../middleware/verifyJWT')

const {
  submitGraduateExitSurvey,
  getAllSurveyData,


} = require("../controllers/graduateExit");


const {  submitAnnex1D,
  getAllAnnex1D}=require("../controllers/Anex1dController")

const {submitEmployerFeedback,  getEmployerFeedbacks} = require("../controllers/employerfeedbackController")

router.get("/graduateExitSurvey", verifyToken, getAllSurveyData);

router.post("/employer-feedback", verifyToken, submitEmployerFeedback);

router.post("/exit", verifyToken, submitGraduateExitSurvey);

router.get("/employer-feedback",getEmployerFeedbacks)

// MAIN ROUTE = /surveys
router.post("/annex1D",verifyToken, submitAnnex1D);
router.get("/annex1D", getAllAnnex1D);
module.exports = router;
