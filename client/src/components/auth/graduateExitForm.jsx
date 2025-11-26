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
import "./modern-form.css"; // NEW CSS

export default function GraduateExitSurvey() {
  const Base_Url = "http://localhost:5000";

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
          <FormHeader>Graduate Exit Survey</FormHeader>
          <SubText>
            The SPRING - 25 Graduate Exit Survey collects valuable feedback from graduating students.
          </SubText>
        </div>

        <div className="row g-4 mt-2">

          {/* LEFT SIDE */}
          <div className="col-md-6">

            {/* Section Card */}
            <div className="form-card shadow-sm p-4">

              <h5 className="section-title">Personal Information</h5>

              {/* Department */}
              <DropDown
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              >
                <DropDown.Option>Select Department *</DropDown.Option>
                <DropDown.Option>Software Engineering</DropDown.Option>
                <DropDown.Option>Computer Science</DropDown.Option>
                <DropDown.Option>Information Technology</DropDown.Option>
              </DropDown>
              <FormError errors={errors} errorKey="department" />

              {/* Degree */}
              <DropDown
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
              >
                <DropDown.Option>Select Degree *</DropDown.Option>
                <DropDown.Option>BS Software Engineering</DropDown.Option>
                <DropDown.Option>BS Computer Science</DropDown.Option>
                <DropDown.Option>BS Information Technology</DropDown.Option>
              </DropDown>
              <FormError errors={errors} errorKey="degree" />

              {/* Name */}
              <InputField
                type="text"
                label="Full Name *"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
              <FormError errors={errors} errorKey="fullName" />

              {/* Email */}
              <InputField
                type="email"
                label="Email *"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <FormError errors={errors} errorKey="email" />

              {/* Phone */}
              <InputField
                type="text"
                label="Phone Number *"
                placeholder="03xx-xxxxxxx"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              <FormError errors={errors} errorKey="phone" />

              {/* Participation */}
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

              {[
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
              ].map((item) => (
                <React.Fragment key={item.key}>
                  <DropDown
                    value={formData[item.key]}
                    onChange={(e) =>
                      setFormData({ ...formData, [item.key]: e.target.value })
                    }
                  >
                    <DropDown.Option>{item.text} *</DropDown.Option>
                    {ratingOptions.map((r) => (
                      <DropDown.Option key={r}>{r}</DropDown.Option>
                    ))}
                  </DropDown>
                  <FormError errors={errors} errorKey={item.key} />
                </React.Fragment>
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
