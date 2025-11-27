import React, { useState } from "react";
import ButtonComponent from "../Button/Button";
import InputField from "../InputField/InputField";
import FormHeader from "../FormHeader/FormHeader";
import SubText from "../SubText/SubText";
import DropDown from "../DropDown/DropDown";
import FormError from "../ErrorMessage/ErrorMessage";
import Toast from "../Toast/Toast";
import Loader from "../Loader/Loader";
import { usePost } from "../../hooks/usePost";
import "./modern-form.css"; // same CSS as form 1
import { useNavigate } from "react-router-dom";

export default function EmployerFeedbackForm() {
  const Base_Url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    employerName: "",
    designation: "",
    email: "",
    phone: "",
    interneeName: "",
    interneeDiscipline: "",
    totalInterneeCount: "",
    departmentInternCount: "",

    ai: "",
    devDesign: "",
    marketing: "",
    graphics: "",
    analytics: "",
    cyber: "",
    technical: "",
    it: "",
    rnd: "",
    other: "",

    plo3_problemSolving: "",
    plo2_dataAnalysis: "",
    plo1_theoryToPractice: "",
    plo4_judgement: "",
    plo5_technicalSkills: "",
    plo6_teamwork: "",
    plo7_communication: "",
    plo8_societalAwareness: "",
    plo9_ethics: "",
    plo10_independentThinking: "",
    plo10_outOfBox: "",

    comments: "",
  });

  const [errors, setErrors] = useState({});
  const [submissionSuccess, setSubmissionSuccess] = useState(false); // State for success message
  
  const { post, loading, error } = usePost(`${Base_Url}/survey/employer-feedback`);

  const ratingOptions = ["Excellent", "Very Good", "Good", "Fair", "Poor"];

  const internRange = ["0", "1-5", "5-20", "20-50", "Above 50"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionSuccess(false); // Reset success state on new submission attempt

    let newErrors = {};
    // Basic validation: check if required string fields are empty
    Object.keys(formData).forEach((key) => {
      if (typeof formData[key] === 'string' && !formData[key].trim()) {
         newErrors[key] = "This field is required";
      }
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // ------------------------------------------------------------------
    // 🛠️ FIX IMPLEMENTED HERE: Clean and convert fields Mongoose expects as Numbers
    // ------------------------------------------------------------------
    const dataToSend = { ...formData };
    const numberFields = [
        "totalInterneeCount", 
        "ai", "devDesign", "marketing", "graphics", "analytics", 
        "cyber", "technical", "it", "rnd", "other"
    ];

    numberFields.forEach(key => {
        const rawValue = dataToSend[key];
        
        // 1. Remove all non-digit characters (including commas, spaces, backticks, etc.)
        const cleanedString = rawValue ? rawValue.toString().replace(/[^0-9]/g, '') : '';
        
        // 2. Convert to an Integer. Defaults to 0 if cleaning results in an empty string.
        dataToSend[key] = parseInt(cleanedString) || 0; 
    });
    // ------------------------------------------------------------------


    const response = await post(dataToSend);
    
    // Handle API response
    if (response?.success) {
        setSubmissionSuccess(true);
        // Clear form data on successful submission
        setFormData({
            companyName: "", employerName: "", designation: "", email: "", phone: "",
            interneeName: "", interneeDiscipline: "", totalInterneeCount: "", departmentInternCount: "",
            ai: "", devDesign: "", marketing: "", graphics: "", analytics: "", cyber: "", technical: "", it: "", rnd: "", other: "",
            plo3_problemSolving: "", plo2_dataAnalysis: "", plo1_theoryToPractice: "", plo4_judgement: "", plo5_technicalSkills: "",
            plo6_teamwork: "", plo7_communication: "", plo8_societalAwareness: "", plo9_ethics: "", plo10_independentThinking: "",
            plo10_outOfBox: "", comments: "",
        });
        setErrors({}); 
        navigate('/register/form4');
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="modern-form-container container">
      <form onSubmit={handleSubmit} className="modern-form">

        {/* Header */}
        <div className="text-center mb-4">
          <FormHeader>Internship - Employer's Feedback Form</FormHeader>
          <SubText>
            Your feedback will help us improve the performance of LGU interns. All information is confidential.
          </SubText>
        </div>


        {/* ====  TWO COLUMN LAYOUT  ==== */}
        <div className="row g-4">

          {/* LEFT SIDE */}
          <div className="col-md-6">
            <div className="form-card shadow-sm p-4">

              <h5 className="section-title">Company & Employer Information</h5>

              <InputField
                label="Company Name"
                placeholder="Enter Company Name"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              />
              <FormError errors={errors} errorKey="companyName" />

              <InputField
                label="Your Name"
                placeholder="Enter Your Name"
                value={formData.employerName}
                onChange={(e) => setFormData({ ...formData, employerName: e.target.value })}
              />
              <FormError errors={errors} errorKey="employerName" />

              <InputField
                label="Designation"
                placeholder="Enter Designation"
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
              />
              <FormError errors={errors} errorKey="designation" />

              <InputField
                label="Email"
                type="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <FormError errors={errors} errorKey="email" />

              <InputField
                label="Contact Number"
                placeholder="03xx-xxxxxxx"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              <FormError errors={errors} errorKey="phone" />
            </div>


            {/* Internee Details */}
            <div className="form-card shadow-sm p-4 mt-4">
              <h5 className="section-title">Internee Information</h5>

              <InputField
                label="Internee Name"
                placeholder="Enter Internee Name"
                value={formData.interneeName}
                onChange={(e) => setFormData({ ...formData, interneeName: e.target.value })}
              />
              <FormError errors={errors} errorKey="interneeName" />

              <InputField
                label="Internee Discipline"
                placeholder="Enter Discipline"
                value={formData.interneeDiscipline}
                onChange={(e) => setFormData({ ...formData, interneeDiscipline: e.target.value })}
              />
              <FormError errors={errors} errorKey="interneeDiscipline" />

              <InputField
                label="Total number of LGU interns"
                placeholder="Enter count"
                value={formData.totalInterneeCount}
                onChange={(e) => setFormData({ ...formData, totalInterneeCount: e.target.value })}
              />
              <FormError errors={errors} errorKey="totalInterneeCount" />

              <DropDown
                value={formData.departmentInternCount}
                onChange={(e) => setFormData({ ...formData, departmentInternCount: e.target.value })}
              >
                <DropDown.Option>Select Intern Count Range</DropDown.Option>
                {internRange.map((r) => (
                  <DropDown.Option key={r}>{r}</DropDown.Option>
                ))}
              </DropDown>
              <FormError errors={errors} errorKey="departmentInternCount" />
            </div>
          </div>


          {/* RIGHT SIDE */}
          <div className="col-md-6">

            {/* Department Breakdown */}
            <div className="form-card shadow-sm p-4">
              <h5 className="section-title">Department Breakdown</h5>

              {[
                ["ai", "AI"],
                ["devDesign", "Development & Design"],
                ["marketing", "Digital Marketing"],
                ["graphics", "Graphics Designing"],
                ["analytics", "Data Analytics"],
                ["cyber", "Cyber Security"],
                ["technical", "Technical"],
                ["it", "IT"],
                ["rnd", "R&D"],
                ["other", "Other"],
              ].map(([key, label]) => (
                <React.Fragment key={key}>
                  <InputField
                    label={`${label} Intern Count`}
                    placeholder="0"
                    type="number"
                    // IMPORTANT: The raw string is kept in state, but cleaned on submit
                    value={formData[key]}
                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                  />
                  <FormError errors={errors} errorKey={key} />
                </React.Fragment>
              ))}
            </div>


            {/* PLO Rating Section */}
            <div className="form-card shadow-sm p-4 mt-4">
              <h5 className="section-title">Performance Evaluation (PLOs)</h5>

              {[
                ["plo3_problemSolving", "Problem formulation & solving (PLO-3)"],
                ["plo2_dataAnalysis", "Data collection & analysis (PLO-2)"],
                ["plo1_theoryToPractice", "Theory to practice (PLO-1)"],
                ["plo4_judgement", "Judgment & decision-making (PLO-4)"],
                ["plo5_technicalSkills", "Technical / IT Skills (PLO-5)"],
                ["plo6_teamwork", "Teamwork (PLO-6)"],
                ["plo7_communication", "Communication skills (PLO-7)"],
                ["plo8_societalAwareness", "Societal & sustainability awareness (PLO-8)"],
                ["plo9_ethics", "Workplace ethics (PLO-9)"],
                ["plo10_independentThinking", "Independent thinking (PLO-10)"],
                ["plo10_outOfBox", "Out-of-box thinking (PLO-10)"]
              ].map(([key, label]) => (
                <React.Fragment key={key}>
                  <DropDown
                    value={formData[key]}
                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                  >
                    <DropDown.Option>{label}</DropDown.Option>
                    {ratingOptions.map((rate) => (
                      <DropDown.Option key={rate}>{rate}</DropDown.Option>
                    ))}
                  </DropDown>
                  <FormError errors={errors} errorKey={key} />
                </React.Fragment>
              ))}
            </div>

          </div>
        </div>

        {/* Comments + Submit Button */}
        <div className="form-card shadow-sm p-4 mt-4">
          <h5 className="section-title">General Comments</h5>

          <InputField
            label="Comments"
            placeholder="Write your comments"
            value={formData.comments}
            onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
          />
          <FormError errors={errors} errorKey="comments" />
        </div>

        <div className="text-center mt-4">
          <ButtonComponent type="submit" className="px-5">
            Submit Feedback
          </ButtonComponent>
        </div>

        {error && <Toast type="error" message={error} />}
        {submissionSuccess && <Toast type="success" message="Employer Feedback submitted successfully! Thank you." />}
      </form>
    </div>
  );
}