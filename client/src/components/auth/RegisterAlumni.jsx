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
    StdRollNo: ``,
    FatherName: "",
    email: "",
    password: "",
    department: "",
    active: 0,
    role: "alumni",
    employmentStatus: "",
    jobTitle: "",
    graduationYear: "",
    companyName: "",
    sector: "",
    designation: ""
  });

  const sectorOptions = [
    "Information Technology",
    "Education",
    "Healthcare",
    "Finance",
    "Marketing",
    "Engineering",
    "Government",
    "Other"
  ];

  const designationOptions = [
    "Intern",
    "Associate",
    "Senior",
    "Lead",
    "Manager",
    "Director",
    "VP",
    "C-Level",
    "Other"
  ];

  const jobTitleOptions = [
    "Software Engineer",
    "Product Manager",
    "Data Scientist",
    "Graphic Designer",
    "HR Manager",
    "Teacher",
    "Accountant",
    "Consultant",
    "Other"
  ];

  const companyOptions = [
    "Systems Limited",
    "NetSol Technologies",
    "10Pearls",
    "Tkxel",
    "Nextbridge",
    "Techlogix",
    "Contour Software",
    "Arbisoft",
    "Confiz",
    "CureMD",
    "Cubix",
    "VentureDive",
    "Arpatech",
    "Ovex Technologies",
    "iCreativez Technologies",
    "Folio3",
    "Avanza Solutions",
    "i2c Inc",
    "TRG Pakistan",
    "Other"
  ];

  const OtherInput = ({ field, placeholder }) => (
    <div style={{ marginTop: "10px" }}>
      <InputField
        type="text"
        placeholder={placeholder}
        value={formData[field]}
        onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
      />
    </div>
  );

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { post, loading, error } = usePost(`${Base_Url}/auth/register`);

  React.useEffect(() => {
    const fetchStudentData = async () => {
      if (formData.batch && formData.degree && formData.rollNo) {
        try {
          const paddedRollNo = formData.rollNo.toString().padStart(3, '0');
          const response = await fetch(`${Base_Url}/auth/register/formdata/${formData.batch}/${formData.degree}/${paddedRollNo}`);
          if (response.ok) {
            const json = await response.json();

            if (json.alumniData && json.alumniData.length > 0) {
              const data = json.alumniData[0];

              // Parse StudentName into firstName and lastName
              let fName = "";
              let lName = "";

              if (data.StudentName) {
                const nameParts = data.StudentName.trim().split(" ");
                if (nameParts.length > 0) {
                  // Strategy: Last word is Last Name, everything else is First Name
                  if (nameParts.length === 1) {
                    fName = nameParts[0];
                  } else {
                    lName = nameParts.pop();
                    fName = nameParts.join(" ");
                  }
                }
              }

              setFormData(prev => ({
                ...prev,
                firstName: data.firstName || fName || prev.firstName,
                lastName: data.lastName || lName || prev.lastName,
                FatherName: data.FatherName || prev.FatherName
              }));
            }
          }
        } catch (error) {
          console.error("Failed to fetch student data", error);
        }
      }
    };

    fetchStudentData();
  }, [formData.batch, formData.degree, formData.rollNo, Base_Url]);

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

            {/* Father Name - Full Width */}
            <div style={{ marginBottom: "20px" }}>
              <InputField
                type="text"
                label="Father Name"
                placeholder="Enter your father name"
                onChange={e => setFormData({ ...formData, FatherName: e.target.value })}
                value={formData.FatherName}
              />
              <FormError errors={errors} errorKey="FatherName" />
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
                <DropDown.Option>BS SE</DropDown.Option>
                <DropDown.Option>BS CS</DropDown.Option>
                <DropDown.Option>BS IT</DropDown.Option>
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
                <DropDown.Option>Sp-2023</DropDown.Option>
                <DropDown.Option>Fa-2022</DropDown.Option>
                <DropDown.Option>Sp-2022</DropDown.Option>
                <DropDown.Option>Fa-2021</DropDown.Option>
                <DropDown.Option>Sp-2021</DropDown.Option>
                <DropDown.Option>Fa-2020</DropDown.Option>
                <DropDown.Option>Sp-2020</DropDown.Option>
                <DropDown.Option>Fa-2019</DropDown.Option>
                <DropDown.Option>Sp-2019</DropDown.Option>
                <DropDown.Option>Fa-2018</DropDown.Option>
                <DropDown.Option>Sp-2018</DropDown.Option>
                <DropDown.Option>Fa-2017</DropDown.Option>
                <DropDown.Option>Sp-2017</DropDown.Option>
                <DropDown.Option>Fa-2016</DropDown.Option>
                <DropDown.Option>Sp-2016</DropDown.Option>
                <DropDown.Option>Fa-2015</DropDown.Option>
                <DropDown.Option>Sp-2015</DropDown.Option>
                <DropDown.Option>Fa-2014</DropDown.Option>
                <DropDown.Option>Sp-2014</DropDown.Option>
                <DropDown.Option>Fa-2013</DropDown.Option>
                <DropDown.Option>Sp-2013</DropDown.Option>
                <DropDown.Option>Fa-2012</DropDown.Option>
                <DropDown.Option>Sp-2012</DropDown.Option>
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

            {/* Sector - Full Width */}
            <div style={{ marginBottom: "20px" }}>
              <DropDown
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData({ ...formData, sector: value === "Other" ? "Other" : value });
                }}
                value={sectorOptions.includes(formData.sector) ? formData.sector : (formData.sector ? "Other" : "")}
              >
                <DropDown.Option value="">Select Sector</DropDown.Option>
                {sectorOptions.map((opt) => (
                  <DropDown.Option key={opt} value={opt}>{opt}</DropDown.Option>
                ))}
              </DropDown>
              {(formData.sector === "Other" || (!sectorOptions.includes(formData.sector) && formData.sector !== "")) && (
                <div style={{ marginTop: "10px" }}>
                  <InputField
                    type="text"
                    placeholder="Enter Sector"
                    value={formData.sector === "Other" ? "" : formData.sector}
                    onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                  />
                </div>
              )}
              <FormError errors={errors} errorKey="sector" />
            </div>

            {/* Designation - Full Width */}
            <div style={{ marginBottom: "20px" }}>
              <DropDown
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData({ ...formData, designation: value === "Other" ? "Other" : value });
                }}
                value={designationOptions.includes(formData.designation) ? formData.designation : (formData.designation ? "Other" : "")}
              >
                <DropDown.Option value="">Select Designation</DropDown.Option>
                {designationOptions.map((opt) => (
                  <DropDown.Option key={opt} value={opt}>{opt}</DropDown.Option>
                ))}
              </DropDown>
              {(formData.designation === "Other" || (!designationOptions.includes(formData.designation) && formData.designation !== "")) && (
                <div style={{ marginTop: "10px" }}>
                  <InputField
                    type="text"
                    placeholder="Enter Designation"
                    value={formData.designation === "Other" ? "" : formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  />
                </div>
              )}
              <FormError errors={errors} errorKey="designation" />
            </div>

            {/* Job Title - Full Width */}
            <div style={{ marginBottom: "20px" }}>
              <DropDown
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData({ ...formData, jobTitle: value === "Other" ? "Other" : value });
                }}
                value={jobTitleOptions.includes(formData.jobTitle) ? formData.jobTitle : (formData.jobTitle ? "Other" : "")}
              >
                <DropDown.Option value="">Select Job Title</DropDown.Option>
                {jobTitleOptions.map((opt) => (
                  <DropDown.Option key={opt} value={opt}>{opt}</DropDown.Option>
                ))}
              </DropDown>
              {(formData.jobTitle === "Other" || (!jobTitleOptions.includes(formData.jobTitle) && formData.jobTitle !== "")) && (
                <div style={{ marginTop: "10px" }}>
                  <InputField
                    type="text"
                    placeholder="Enter Job Title"
                    value={formData.jobTitle === "Other" ? "" : formData.jobTitle}
                    onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                  />
                </div>
              )}
              <FormError errors={errors} errorKey="jobTitle" />
            </div>

            {/* Company Name - Full Width */}
            <div style={{ marginBottom: "40px" }}>
              <DropDown
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData({ ...formData, companyName: value === "Other" ? "Other" : value });
                }}
                value={companyOptions.includes(formData.companyName) ? formData.companyName : (formData.companyName ? "Other" : "")}
              >
                <DropDown.Option value="">Select Company Name</DropDown.Option>
                {companyOptions.map((opt) => (
                  <DropDown.Option key={opt} value={opt}>{opt}</DropDown.Option>
                ))}
              </DropDown>
              {(formData.companyName === "Other" || (!companyOptions.includes(formData.companyName) && formData.companyName !== "")) && (
                <div style={{ marginTop: "10px" }}>
                  <InputField
                    type="text"
                    label="Company Name"
                    placeholder="Enter Company Name"
                    value={formData.companyName === "Other" ? "" : formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  />
                </div>
              )}
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