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
import "./modern-form.css";

export default function GraduateExitSurvey() {
  const Base_Url = import.meta.env.VITE_API_URL;

  const PLO_QUESTIONS = [
    { key: "plo1", text: "Prepared to enter professional life [PLO-1]" },
    { key: "plo2", text: "Analytical & problem-solving skills [PLO-2]" },
    { key: "plo3", text: "Analyze complex problems [PLO-3]" },
    { key: "plo5", text: "Use modern tools & techniques [PLO-5]" },
    { key: "plo8", text: "Societal/health/safety awareness [PLO-8]" },
    { key: "plo4", text: "Environmental & sustainable solutions [PLO-4]" },
    { key: "plo9", text: "Ethical principles understanding [PLO-9]" },
    { key: "plo6", text: "Work individually & in teams [PLO-6]" },
    { key: "plo7", text: "Effective communication [PLO-7]" },
    { key: "plo10", text: "Lifelong learning & innovation [PLO-10]" },
  ];

  const ratingOptions = ["Excellent", "Very Good", "Good", "Fair", "Poor"];

  const [formData, setFormData] = useState({
    department: "",
    degree: "",
    fullName: "",
    email: "",
    phone: "",
    participation: "",
    plo1: "",
    plo2: "",
    plo3: "",
    plo5: "",
    plo8: "",
    plo4: "",
    plo9: "",
    plo6: "",
    plo7: "",
    plo10: "",
  });

  const [errors, setErrors] = useState({});
  const { post, loading, error } = usePost(`${Base_Url}/survey/exit`);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    // Validate personal info
    ["department", "degree", "fullName", "email", "phone", "participation"].forEach((key) => {
      if (!formData[key] || formData[key].trim() === "") {
        newErrors[key] = "This field is required";
      }
    });

    // Validate PLO ratings
    PLO_QUESTIONS.forEach((item) => {
      if (!formData[item.key] || formData[item.key].trim() === "") {
        newErrors[item.key] = "Please select a rating";
      }
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const alumniId = localStorage.getItem("alumniId");

    // Backend expects PLO answers as separate keys
    const payload = {

      department: formData.department,
      degree: formData.degree,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      participation: formData.participation,
      plo1: formData.plo1,
      plo2: formData.plo2,
      plo3: formData.plo3,
      plo4: formData.plo4,
      plo5: formData.plo5,
      plo6: formData.plo6,
      plo7: formData.plo7,
      plo8: formData.plo8,
      plo9: formData.plo9,
      plo10: formData.plo10,
    };

    await post(payload);
  };

  if (loading) return <Loader />;

  return (
    <div className="modern-form-container container">
      <form onSubmit={handleSubmit} className="modern-form">
        <div className="text-center mb-4">
          <FormHeader>Graduate Exit Survey</FormHeader>
          <SubText>
            The SPRING - 25 Graduate Exit Survey collects valuable feedback from graduating students.
          </SubText>
        </div>

        <div className="row g-4 mt-2">
          {/* LEFT SIDE */}
          <div className="col-md-6">
            <div className="form-card shadow-sm p-4">
              <h5 className="section-title">Personal Information</h5>

              <DropDown
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              >
                <DropDown.Option value="">Select Department *</DropDown.Option>
                <DropDown.Option value="Software Engineering">Software Engineering</DropDown.Option>
                <DropDown.Option value="Computer Science">Computer Science</DropDown.Option>
                <DropDown.Option value="Information Technology">Information Technology</DropDown.Option>
              </DropDown>
              <FormError errors={errors} errorKey="department" />

              <DropDown
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
              >
                <DropDown.Option value="">Select Degree *</DropDown.Option>
                <DropDown.Option value="BS Software Engineering">BS Software Engineering</DropDown.Option>
                <DropDown.Option value="BS Computer Science">BS Computer Science</DropDown.Option>
                <DropDown.Option value="BS Information Technology">BS Information Technology</DropDown.Option>
              </DropDown>
              <FormError errors={errors} errorKey="degree" />

              <InputField
                type="text"
                label="Full Name *"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
              <FormError errors={errors} errorKey="fullName" />

              <InputField
                type="email"
                label="Email *"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <FormError errors={errors} errorKey="email" />

              <InputField
                type="text"
                label="Phone Number *"
                placeholder="03xx-xxxxxxx"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              <FormError errors={errors} errorKey="phone" />

              <InputField
                type="text"
                label="Participation *"
                placeholder="Have you participated in any competition?"
                value={formData.participation}
                onChange={(e) => setFormData({ ...formData, participation: e.target.value })}
              />
              <FormError errors={errors} errorKey="participation" />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-md-6">
            <div className="form-card shadow-sm p-4">
              <h5 className="section-title">PLO Rating Section</h5>

              {PLO_QUESTIONS.map((item) => (
                <div key={item.key} className="mb-3">
                  <label className="form-label">{item.text}</label>
                  <DropDown
                    value={formData[item.key]}
                    onChange={(e) => setFormData({ ...formData, [item.key]: e.target.value })}
                  >
                    <DropDown.Option value="">Select rating *</DropDown.Option>
                    {ratingOptions.map((r) => (
                      <DropDown.Option key={r} value={r}>
                        {r}
                      </DropDown.Option>
                    ))}
                  </DropDown>
                  <FormError errors={errors} errorKey={item.key} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center mt-4">
          <ButtonComponent type="submit" className="px-5">
            Submit Survey
          </ButtonComponent>
        </div>

        {error && <Toast type="error" message={error} />}
      </form>
    </div>
  );
}
