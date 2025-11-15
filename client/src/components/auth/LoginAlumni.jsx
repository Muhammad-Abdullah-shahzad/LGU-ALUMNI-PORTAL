import React from "react";
import ButtonComponent from "../Button/Button";
import InputField from "../InputField/InputField";
import FormLayout from "../FormLayout/FormLayout";
import FormHeader from "../FormHeader/FormHeader";

export default function LoginAlumni() {
    return (
        <React.Fragment>
            <FormLayout>
                <FormHeader>LGU ALUMNI PORTAL</FormHeader>
                <InputField type="email" label="Enter Email Address" placeholder="e.g xyz@domain.com" />
                <InputField type="password" label="Enter Password Here" placeholder="e.g 123.xyx" />
                <ButtonComponent>
                    LogIn
                </ButtonComponent>
            </FormLayout>
        </React.Fragment>
    )
}