import React, { useState } from "react";
import ButtonComponent from "../Button/Button";
import InputField from "../InputField/InputField";
import FormLayout from "../FormLayout/FormLayout";
import FormHeader from "../FormHeader/FormHeader";
import SubText from "../SubText/SubText";
import DropDown from "../DropDown/DropDown";
import FormError from "../ErrorMessage/ErrorMessage";
import RegisterAlumniUtils from "../../utility/RegisterAlumniUtility";
import Toast from "../Toast/Toast";
import { usePost } from "../../hooks/usePost";
import Loader from "../Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/registerimg.png";

export default function RegisterAlumni() {
  const Base_Url = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    cnic: "",
    batch: "",
    degree: "",
    rollNo: "",
    email: "",
    password: "",
    department: "",
    active: 0,
    role: "alumni",
    employmentStatus: "",
    jobTitle: "",
    graduationYear: "",
    companyName: ""
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { post, loading, error } = usePost(`${Base_Url}/auth/register`);

  if (loading) return <Loader />;

  return (
    <div 
      style={{
        display: "flex",
        height: "100vh",
        width: "100%",
        overflow: "hidden"
      }}
    >
      {/* LEFT SECTION - 50% Fixed Background */}
      <div
        style={{
          width: "50%",
          height: "100vh",
          background: `url(${img}) no-repeat center center`,
          objectFit: "cover",
          backgroundSize: "cover",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: "60px 40px",
          textAlign: "center",
          position: "fixed",
          left: 0,
          top: 0
        }}
      >
        <h1 style={{ 
          fontSize: "48px", 
          fontWeight: "700", 
          marginBottom: "24px",
          lineHeight: "1.2"
        }}>
          LGU Alumni Portal
        </h1>

        <p style={{ 
          fontSize: "20px", 
          opacity: 0.9, 
          maxWidth: "80%",
          lineHeight: "1.6"
        }}>
          Join our alumni network, stay connected, <br /> and access exclusive opportunities.
        </p>
      </div>

      {/* RIGHT SECTION - 50% Scrollable Form */}
      <div
        style={{
          width: "50%",
          height: "100vh",
          marginLeft: "50%",
          overflowY: "scroll",
          background: "#f5f7fa",
        }}
      >
        <div style={{ 
          width: "500px",
          margin: "0 auto",
        }}>
          <FormLayout
          style={{ marginTop: "600px", marginBottom: "40px" }}
            onSubmit={(e) =>
              RegisterAlumniUtils.handleSubmit(
                e,
                formData,
                setErrors,
                post,
                navigate
              )
            }
          >
            <div style={{ marginBottom: "0px" }}>
              <FormHeader>Register as Alumni</FormHeader>
              <SubText>Fill your details to continue</SubText>
            </div>

            {/* First Name - Full Width */}
            <div style={{ marginBottom: "20px" }}>
              <InputField 
                type="text" 
                label="First Name"
                placeholder="Enter your first name"
                onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                value={formData.firstName}
              />
              <FormError errors={errors} errorKey="firstName" />
            </div>

            {/* Last Name - Full Width */}
            <div style={{ marginBottom: "20px" }}>
              <InputField 
                type="text" 
                label="Last Name"
                placeholder="Enter your last name"
                onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                value={formData.lastName}
              />
              <FormError errors={errors} errorKey="lastName" />
            </div>

            {/* Email - Full Width */}
            <div style={{ marginBottom: "20px" }}>
              <InputField 
                type="email" 
                label="Email Address"
                placeholder="e.g xyz@lgu.edu.pk"
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                value={formData.email}
              />
              <FormError errors={errors} errorKey="email" />
            </div>

            {/* Password - Full Width */}
            <div style={{ marginBottom: "20px" }}>
              <InputField 
                type="password" 
                label="Password"
                placeholder="Enter a strong password"
                onChange={e => setFormData({ ...formData, password: e.target.value })}
                value={formData.password}
              />
              <FormError errors={errors} errorKey="password" />
            </div>

            {/* CNIC - Full Width */}
            <div style={{ marginBottom: "20px" }}>
              <InputField 
                type="text" 
                label="CNIC"
                placeholder="xxxxx-xxxxxxx-x"
                onChange={e => setFormData({ ...formData, cnic: e.target.value })}
                value={formData.cnic}
              />
              <FormError errors={errors} errorKey="cnic" />
            </div>

            {/* Department - Full Width */}
            <div style={{ marginBottom: "20px" }}>
              <DropDown
                onChange={e => setFormData({ ...formData, department: e.target.value })}
                value={formData.department}
              >
                <DropDown.Option>Select Your Department</DropDown.Option>
                <DropDown.Option>SE</DropDown.Option>
                <DropDown.Option>CS</DropDown.Option>
                <DropDown.Option>IT</DropDown.Option>
              </DropDown>
              <FormError errors={errors} errorKey="department" />
            </div>

            {/* Degree - Full Width */}
            <div style={{ marginBottom: "20px" }}>
              <DropDown
                onChange={e => setFormData({ ...formData, degree: e.target.value })}
                value={formData.degree}
              >
                <DropDown.Option>Select Your Degree</DropDown.Option>
                <DropDown.Option>BSSE</DropDown.Option>
                <DropDown.Option>BSCS</DropDown.Option>
                <DropDown.Option>BSIT</DropDown.Option>
              </DropDown>
              <FormError errors={errors} errorKey="degree" />
            </div>

            {/* Batch - Full Width */}
            <div style={{ marginBottom: "20px" }}>
              <DropDown
                onChange={e => setFormData({ ...formData, batch: e.target.value })}
                value={formData.batch}
              >
                <DropDown.Option>Select Your Batch</DropDown.Option>
                <DropDown.Option>Fa-2023</DropDown.Option>
                <DropDown.Option>Fa-2022</DropDown.Option>
                <DropDown.Option>Fa-2021</DropDown.Option>
                <DropDown.Option>Fa-2020</DropDown.Option>
                <DropDown.Option>Fa-2019</DropDown.Option>
                <DropDown.Option>Fa-2018</DropDown.Option>
                <DropDown.Option>Fa-2017</DropDown.Option>
                <DropDown.Option>Fa-2016</DropDown.Option>
                <DropDown.Option>Fa-2015</DropDown.Option>
                <DropDown.Option>Fa-2014</DropDown.Option>
                <DropDown.Option>Fa-2013</DropDown.Option>
                <DropDown.Option>Fa-2012</DropDown.Option>
              </DropDown>
              <FormError errors={errors} errorKey="batch" />
            </div>

            {/* Roll No - Full Width */}
            <div style={{ marginBottom: "20px" }}>
              <InputField 
                type="number" 
                placeholder="e.g 202"
                label="Roll Number"
                onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                value={formData.rollNo}
              />
              <FormError errors={errors} errorKey="rollNo" />
            </div>

            {/* Graduation Year - Full Width */}
            <div style={{ marginBottom: "20px" }}>
              <InputField
                type="number"
                label="Graduation Year"
                placeholder="e.g 2024"
                onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                value={formData.graduationYear}
              />
              <FormError errors={errors} errorKey="graduationYear" />
            </div>

            {/* Employment Status - Full Width */}
            <div style={{ marginBottom: "20px" }}>
              <DropDown
                onChange={e => setFormData({ ...formData, employmentStatus: e.target.value })}
                value={formData.employmentStatus}
              >
                <DropDown.Option>Select Employment Status</DropDown.Option>
                <DropDown.Option>employed</DropDown.Option>
                <DropDown.Option>unemployed</DropDown.Option>
              </DropDown>
              <FormError errors={errors} errorKey="employmentStatus" />
            </div>

            {/* Job Title - Full Width */}
            <div style={{ marginBottom: "20px" }}>
              <InputField
                type="text"
                label="Job Title"
                placeholder="e.g Software Engineer"
                onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                value={formData.jobTitle}
              />
              <FormError errors={errors} errorKey="jobTitle" />
            </div>

            {/* Company Name - Full Width */}
            <div style={{ marginBottom: "40px" }}>
              <InputField
                type="text"
                label="Company Name"
                placeholder="e.g Systems Limited"
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                value={formData.companyName}
              />
              <FormError errors={errors} errorKey="companyName" />
            </div>

            {/* Submit Button */}
            <div style={{ marginBottom: "20px" }}>
              <ButtonComponent type="submit">Register</ButtonComponent>
            </div>

            {error && <Toast type="error" message={error} />}

            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <SubText>
                Already Have Account? <Link to="/login">Log In</Link>
              </SubText>
            </div>
          </FormLayout>
        </div>
      </div>
    </div>
  );
}