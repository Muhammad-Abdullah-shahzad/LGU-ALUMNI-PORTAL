import React, { useState } from "react";
import InputField from "../InputField/InputField";
import DropDown from "../DropDown/DropDown";
import FormHeader from "../FormHeader/FormHeader";
import SubText from "../SubText/SubText";
import FormError from "../ErrorMessage/ErrorMessage";
import ButtonComponent from "../Button/Button";
import Toast from "../Toast/Toast";
import Loader from "../Loader/Loader";
import { usePost } from "../../hooks/usePost";
import "./modern-form.css";

export default function Annex1DAlumniSurvey() {
  const Base_Url = import.meta.env.VITE_API_URL;
  const { post, loading, error } = usePost(`${Base_Url}/survey/annex1D`);

  const ratingOptions = ["Excellent", "Very Good", "Good", "Fair", "Poor"];

  const [formData, setFormData] = useState({
    program: "",
    department: "",
    selfAssessment: {},
    generalComments: "",
    careerOpportunities: "",
    departmentStanding: {},
    name: "",
    organizationName: "",
    position: "",
    graduationYear: "",
    email: "",
    telephone: ""
  });

  const [errors, setErrors] = useState({});

  const selfAssessmentQuestions = [
    { id: 1, text: "Ability to design a system component or process (PEO1)" },
    { id: 2, text: "Adaptation to modern technology or tools (PEO1)" },
    { id: 3, text: "Intellectual and technical knowledge of Software Engineering (PEO1)" },
    { id: 4, text: "General professional responsibility (PEO2)" },
    { id: 5, text: "Fulfilling societal/ethical norms (PEO2)" },
    { id: 6, text: "Awareness of sustainability in digital and engineering practices (PEO2)" },
    { id: 7, text: "Computing Core Knowledge (PEO3)" },
    { id: 8, text: "Adaption to new skills (PEO3)" },
    { id: 9, text: "Ability to work effectively in teams (PEO3)" },
    { id: 10, text: "Oral communication (PEO4)" },
    { id: 11, text: "Report writing skills (PEO4)" },
    { id: 12, text: "Ability to conduct research (PEO4)" },
  ];

  const departmentStandingQuestions = [
    { id: 1, text: "Infrastructure" },
    { id: 2, text: "Faculty" },
    { id: 3, text: "Repute at the National level" },
    { id: 4, text: "Repute at international level" }
  ];

  const handleDropdownChange = (section, key, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const required = ["program", "department", "name", "email"];
    const newErrors = {};
    required.forEach(field => {
      if (!formData[field]) newErrors[field] = "This field is required";
    });
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    try {
      await post(formData);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="modern-form-container container">
      <form onSubmit={handleSubmit} className="modern-form">
        <div className="text-center mb-4">
          <FormHeader>Annex-1D Alumni Survey</FormHeader>
          <SubText>
            (To be filled in by Alumni - after the completion of each academic year)
          </SubText>
          <SubText>
            The purpose of this survey is to obtain alumni input on the quality of education they received at LGU.
          </SubText>
        </div>

        {/* Program & Department */}
        <div className="row g-4 mb-4">
          <div className="col-md-6">
            <div className="form-card shadow-sm p-4 h-100">
              <h5 className="section-title">Program & Department</h5>
              <DropDown
                value={formData.program}
                onChange={e => setFormData({ ...formData, program: e.target.value })}
              >
                <DropDown.Option>Select Program</DropDown.Option>
                <DropDown.Option>Bachelor of Software Engineering</DropDown.Option>
                <DropDown.Option>Bachelor of Computer Science</DropDown.Option>
              </DropDown>
              <FormError errors={errors} errorKey="program" />

              <DropDown
                value={formData.department}
                onChange={e => setFormData({ ...formData, department: e.target.value })}
              >
                <DropDown.Option>Select Department</DropDown.Option>
                <DropDown.Option>Software Engineering</DropDown.Option>
                <DropDown.Option>Computer Science</DropDown.Option>
              </DropDown>
              <FormError errors={errors} errorKey="department" />
            </div>
          </div>
        </div>

        {/* Split Self Assessment & Department Standing */}
        <div className="row g-4 mb-4">
          {/* Self Assessment */}
          <div className="col-md-6">
            <div className="form-card shadow-sm p-4 h-100">
              <h5 className="section-title">Self Assessment</h5>
              <SubText>How would you rate yourself?</SubText>
              {selfAssessmentQuestions.map(q => (
                <DropDown
                  key={q.id}
                  value={formData.selfAssessment[q.id] || ""}
                  onChange={e => handleDropdownChange("selfAssessment", q.id, e.target.value)}
                >
                  <DropDown.Option>{q.text}</DropDown.Option>
                  {ratingOptions.map(opt => <DropDown.Option key={opt}>{opt}</DropDown.Option>)}
                </DropDown>
              ))}

              <InputField
                label="General Comments"
                placeholder="Maximum 100 characters"
                value={formData.generalComments}
                onChange={e => setFormData({ ...formData, generalComments: e.target.value })}
              />
            </div>
          </div>

          {/* Department Standing */}
          <div className="col-md-6">
            <div className="form-card shadow-sm p-4 h-100">
              <h5 className="section-title">Department Standing</h5>
              <SubText>Rate your department relative to others</SubText>
              {departmentStandingQuestions.map(q => (
                <DropDown
                  key={q.id}
                  value={formData.departmentStanding[q.id] || ""}
                  onChange={e => handleDropdownChange("departmentStanding", q.id, e.target.value)}
                >
                  <DropDown.Option>{q.text}</DropDown.Option>
                  {ratingOptions.map(opt => <DropDown.Option key={opt}>{opt}</DropDown.Option>)}
                </DropDown>
              ))}

              <InputField
                label="Career Opportunities after graduation"
                placeholder="Maximum 100 characters"
                value={formData.careerOpportunities}
                onChange={e => setFormData({ ...formData, careerOpportunities: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Alumni Info */}
        <div className="form-card shadow-sm p-4 mb-4">
          <h5 className="section-title">Alumni Information</h5>
          {[
            ["name", "Name"],
            ["organizationName", "Organization Name"],
            ["position", "Position in Organization"],
            ["graduationYear", "Year of Graduation"],
            ["email", "Email"],
            ["telephone", "Telephone"]
          ].map(([key, label]) => (
            <React.Fragment key={key}>
              <InputField
                label={label}
                value={formData[key]}
                onChange={e => setFormData({ ...formData, [key]: e.target.value })}
              />
              <FormError errors={errors} errorKey={key} />
            </React.Fragment>
          ))}
        </div>

        <div className="text-center">
          <ButtonComponent type="submit" className="px-5">Submit Survey</ButtonComponent>
        </div>

        {error && <Toast type="error" message={error} />}
      </form>
    </div>
  );
}
