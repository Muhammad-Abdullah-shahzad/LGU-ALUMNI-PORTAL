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
import "./modern-form.css"; // shared styles

export default function EmployerSurveyForm() {
  const Base_Url = import.meta.env.VITE_API_URL;
  const { post, loading, error } = usePost(`${Base_Url}/survey/employer`);

  const [formData, setFormData] = useState({
    institute: "",
    department: "",
    degree: "",
    program: "",
    q1_peo1_knowledge: "",
    q2_peo1_problemSolving: "",
    q3_peo1_analytical: "",
    q4_peo1_timeManagement: "",
    q5_peo2_societal: "",
    q6_peo2_globalChallenges: "",
    q7_peo2_sustainability: "",
    q8_peo2_societalImpact: "",
    q9_peo3_communication: "",
    q10_peo3_latestApplications: "",
    q11_peo3_innovation: "",
    q12_peo3_judgment: "",
    q13_peo4_ethics: "",
    q14_peo4_traits: "",
    q15_peo4_teamwork: "",
    q16_peo4_independentThinking: "",
    comments: "",
    org_name: "",
    org_businessType: "",
    org_numberOfGraduates: "",
    title: "",
    firstName: "",
    lastName: "",
    position: "",
    sector: "",
    companyName: "",
    country: "",
    email: "",
    telephone: "",
  });

  const [errors, setErrors] = useState({});
  const ratingOptions = ["Excellent", "Very Good", "Good", "Fair", "Poor"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) newErrors[key] = "This field is required";
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    await post(formData);
  };

  if (loading) return <Loader />;

  return (
    <div className="modern-form-container container">
      <form onSubmit={handleSubmit} className="modern-form">

        {/* Header */}
        <div className="text-center mb-4">
          <FormHeader>Employer Survey</FormHeader>
          <SubText>(To be filled in by Employer after completion of each academic year)</SubText>
          <SubText>This survey pertains to LGU graduates employed at your organization.</SubText>
        </div>

        {/* SPLIT-COLUMN LAYOUT */}
        <div className="row g-4">

          {/* LEFT COLUMN: General Info + Ratings */}
          <div className="col-md-6">
            <div className="form-card shadow-sm p-4 h-100">
              <h5 className="section-title">Institution & Program</h5>
              <DropDown value={formData.institute} onChange={(e) => setFormData({...formData, institute: e.target.value})}>
                <DropDown.Option>Select Institution</DropDown.Option>
                <DropDown.Option>LGU</DropDown.Option>
                <DropDown.Option>LGU Lahore Campus</DropDown.Option>
              </DropDown>
              <FormError errors={errors} errorKey="institute" />

              <DropDown value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})}>
                <DropDown.Option>Select Department</DropDown.Option>
                <DropDown.Option>Software Engineering</DropDown.Option>
                <DropDown.Option>Computer Science</DropDown.Option>
                <DropDown.Option>Information Technology</DropDown.Option>
              </DropDown>
              <FormError errors={errors} errorKey="department" />

              <DropDown value={formData.degree} onChange={(e) => setFormData({...formData, degree: e.target.value})}>
                <DropDown.Option>Select Degree</DropDown.Option>
                <DropDown.Option>BS 4-Year</DropDown.Option>
                <DropDown.Option>Master's</DropDown.Option>
              </DropDown>
              <FormError errors={errors} errorKey="degree" />

              <DropDown value={formData.program} onChange={(e) => setFormData({...formData, program: e.target.value})}>
                <DropDown.Option>Select Program</DropDown.Option>
                <DropDown.Option>Bachelor of Software Engineering</DropDown.Option>
                <DropDown.Option>BS Computer Science</DropDown.Option>
              </DropDown>
              <FormError errors={errors} errorKey="program" />

              {/* Ratings */}
              <h5 className="section-title mt-4">Graduate Knowledge & Skills</h5>
              {[
                ["q1_peo1_knowledge", "Intellectual & technical knowledge (PEO1)"],
                ["q2_peo1_problemSolving", "Problem solving (PEO1)"],
                ["q3_peo1_analytical", "Analytical thinking (PEO1)"],
                ["q4_peo1_timeManagement", "Time management (PEO1)"],
                ["q5_peo2_societal", "Societal & environmental consideration (PEO2)"],
                ["q6_peo2_globalChallenges", "Apply SE to global challenges (PEO2)"],
                ["q7_peo2_sustainability", "Sustainability in digital solutions (PEO2)"],
                ["q8_peo2_societalImpact", "Awareness of societal impact (PEO2)"],
                ["q9_peo3_communication", "Oral communication & presentation (PEO3)"],
                ["q10_peo3_latestApplications", "Applying ideas to latest applications (PEO3)"],
                ["q11_peo3_innovation", "Innovative solutions (PEO3)"],
                ["q12_peo3_judgment", "Judgment of situations (PEO3)"],
                ["q13_peo4_ethics", "Appreciation of ethical values (PEO4)"],
                ["q14_peo4_traits", "Personal & professional traits (PEO4)"],
                ["q15_peo4_teamwork", "Teamwork (PEO4)"],
                ["q16_peo4_independentThinking", "Independent thinking capability (PEO4)"],
              ].map(([key, label]) => (
                <React.Fragment key={key}>
                  <DropDown value={formData[key]} onChange={(e) => setFormData({...formData, [key]: e.target.value})}>
                    <DropDown.Option>{label}</DropDown.Option>
                    {ratingOptions.map((rate) => <DropDown.Option key={rate}>{rate}</DropDown.Option>)}
                  </DropDown>
                  <FormError errors={errors} errorKey={key} />
                </React.Fragment>
              ))}

              <InputField label="General Comments (Max 100 chars)"
                placeholder="Write your comments..." maxLength={100}
                value={formData.comments} onChange={(e) => setFormData({...formData, comments: e.target.value})} />
              <FormError errors={errors} errorKey="comments" />
            </div>
          </div>

          {/* RIGHT COLUMN: Organization & Contact */}
          <div className="col-md-6">
            <div className="form-card shadow-sm p-4 h-100">
              <h5 className="section-title">Organization Information</h5>
              <InputField label="Organization Name" value={formData.org_name} onChange={(e) => setFormData({...formData, org_name: e.target.value})} />
              <FormError errors={errors} errorKey="org_name" />

              <InputField label="Type of Business" value={formData.org_businessType} onChange={(e) => setFormData({...formData, org_businessType: e.target.value})} />
              <FormError errors={errors} errorKey="org_businessType" />

              <InputField label="Number of LGU Graduates" value={formData.org_numberOfGraduates} onChange={(e) => setFormData({...formData, org_numberOfGraduates: e.target.value})} />
              <FormError errors={errors} errorKey="org_numberOfGraduates" />

              <h5 className="section-title mt-4">Employer Contact</h5>
              {[
                ["title", "Title"],
                ["firstName", "First Name"],
                ["lastName", "Last Name"],
                ["position", "Position"],
                ["sector", "Sector"],
                ["companyName", "Company Name"],
                ["country", "Country"],
                ["email", "Email"],
                ["telephone", "Telephone"],
              ].map(([key, label]) => (
                <React.Fragment key={key}>
                  <InputField label={label} value={formData[key]} onChange={(e) => setFormData({...formData, [key]: e.target.value})} />
                  <FormError errors={errors} errorKey={key} />
                </React.Fragment>
              ))}
            </div>
          </div>

        </div>

        {/* Submit Button */}
        <div className="text-center mt-4">
          <ButtonComponent type="submit" className="px-5">Submit Survey</ButtonComponent>
        </div>

        {error && <Toast type="error" message={error} />}
      </form>
    </div>
  );
}
