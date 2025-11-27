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

//Moazam
export default function RegisterAlumni() {
  const Base_Url = "http://localhost:5000";
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
  role:'alumni',
    employmentStatus: "",
    jobTitle: "",
    graduationYear: "",
    companyName: ""
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { post, loading, error } = usePost(`${Base_Url}/auth/register`);



  if (loading) {
    return <Loader />;
  }

  return (
    <React.Fragment>
      <FormLayout onSubmit={(e) => RegisterAlumniUtils.handleSubmit(e, formData, setErrors, post, navigate)}>
        <FormHeader>LAHORE GARRISON UNIVERSITY ALUMNI PORTAL</FormHeader>
        <SubText>Fill Your Details To Continue</SubText>
        <InputField type="text" label="Enter Your FirstName" placeholder="First Name Here" onChange={e => setFormData({ ...formData, firstName: e.target.value })} value={formData.firstName} />
        <FormError errors={errors} errorKey="firstName" />
        <InputField type="text" label="Enter Your Last Name" placeholder="Last Name Here" onChange={(e) => { setFormData({ ...formData, lastName: e.target.value }) }} value={formData.lastName} />
        <FormError errors={errors} errorKey="lastName" />
        <InputField type="email" label="Enter Your Email" placeholder="e.g xyx@lgu.edu.pk" onChange={(e) => { setFormData({ ...formData, email: e.target.value }) }} value={formData.email} />
        <FormError errors={errors} errorKey="email" />
        <InputField type="password" label="Enter Your Password" placeholder="Enter Strong Password" onChange={(e) => { setFormData({ ...formData, password: e.target.value }) }} value={formData.password} />
        <FormError errors={errors} errorKey="password" />
        <InputField type="text" label="Enter Your Cnic" placeholder="e.g xxxxx-xxxxxxx-x" onChange={(e) => { setFormData({ ...formData, cnic: e.target.value }) }} value={formData.cnic} />
        <FormError errors={errors} errorKey="cnic" />
        <DropDown
          onChange={e => setFormData({ ...formData, batch: e.target.value })}
          value={formData.batch}>
          <DropDown.Option>Select Your Batch</DropDown.Option>
          <DropDown.Option>Fa-2023</DropDown.Option>
          <DropDown.Option>Fa-2022</DropDown.Option>
          <DropDown.Option>Fa-2021</DropDown.Option>
        </DropDown>

        {/* Employment Status */}
        <DropDown
          onChange={(e) => setFormData({ ...formData, employmentStatus: e.target.value })}
          value={formData.employmentStatus}
        >
          <DropDown.Option>Select Employment Status</DropDown.Option>
          <DropDown.Option>employed</DropDown.Option>
          <DropDown.Option>unemployed</DropDown.Option>
        </DropDown>
        <FormError errors={errors} errorKey="employmentStatus" />

        {/* Job Title */}
        <InputField
          type="text"
          label="Job Title"
          placeholder="e.g. Software Engineer"
          onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
          value={formData.jobTitle}
        />
        <FormError errors={errors} errorKey="jobTitle" />

        {/* Company Name */}
        <InputField
          type="text"
          label="Company Name"
          placeholder="e.g. Systems Limited"
          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
          value={formData.companyName}
        />
        <FormError errors={errors} errorKey="companyName" />

        {/* Graduation Year */}
        <InputField
          type="number"
          label="Graduation Year"
          placeholder="e.g. 2024"
          onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
          value={formData.graduationYear}
        />
        <FormError errors={errors} errorKey="graduationYear" />

        <FormError errors={errors} errorKey="batch" />
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
        <InputField type="number" placeholder="Enter RollNo e.g 202" label="Enter Your Roll No" onChange={(e) => { setFormData({ ...formData, rollNo: e.target.value }) }} value={formData.rollNo} />
        <FormError errors={errors} errorKey="rollNo" />
        <ButtonComponent type="submit">Register</ButtonComponent>

        {error && <Toast type="error" message={error} />}
        <SubText>Already Have Account ? <Link to='/login' >LogIn</Link></SubText>
      </FormLayout>
    </React.Fragment>
  )
}