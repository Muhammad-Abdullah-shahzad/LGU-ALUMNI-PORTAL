import React, { useState } from "react";
import ButtonComponent from "../Button/Button";
import InputField from "../InputField/InputField";
import FormLayout from "../FormLayout/FormLayout";
import FormHeader from "../FormHeader/FormHeader";
import SubText from "../SubText/SubText";
import DropDown from "../DropDown/DropDown";

export default function RegisterAlumni() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    cnic: "",
    batch: "",
    degree: "",
    rollNo: "",
  });
  return (
    <React.Fragment>
      <FormLayout>
        <FormHeader>LAHORE GARRISON UNIVERSITY ALUMNI PORTAL</FormHeader>

        <SubText>Fill Your Details To Continue</SubText>

        <InputField type="text" label="Enter Your FirstName" placeholder="First Name Here" onChange={e => setFormData({ ...formData, firstName: e.target.value })} value={formData.firstName} />

        <InputField type="text" label="Enter Your Last Name" placeholder="Last Name Here" onChange={(e) => { setFormData({ ...formData, lastName: e.target.value }) }} value={formData.lastName} />

        <InputField type="text" label="Enter Your Cnic" placeholder="e.g xxxxx-xxxxxxx-x" onChange={(e) => { setFormData({ ...formData, cnic: e.target.value }) }} value={formData.cnic} />

        <DropDown
          onChange={e => setFormData({ ...formData, batch: e.target.value })}
          value={formData.batch}>
          <DropDown.Option>Select Your Batch</DropDown.Option>
          <DropDown.Option>Fa-2023</DropDown.Option>
          <DropDown.Option>Fa-2022</DropDown.Option>
          <DropDown.Option>Fa-2021</DropDown.Option>
        </DropDown>

        <DropDown
          onChange={e => setFormData({ ...formData, degree: e.target.value })}
          value={formData.degree}
        >
          <DropDown.Option>Select Your Degree</DropDown.Option>
          <DropDown.Option>BSSE</DropDown.Option>
          <DropDown.Option>BSCS</DropDown.Option>
          <DropDown.Option>BSDS</DropDown.Option>

        </DropDown>
        <InputField type="number" placeholder="Enter RollNo e.g 202" label="Enter Your Roll No" onChange={(e) => { setFormData({ ...formData, rollNo: e.target.value }) }} value={formData.rollNo} />

        <ButtonComponent type="submit">Register</ButtonComponent>
      </FormLayout>
    </React.Fragment>
  )
}