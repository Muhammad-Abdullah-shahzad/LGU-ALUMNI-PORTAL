import React, { useState } from "react";
import ButtonComponent from "../Button/Button";
import InputField from "../InputField/InputField";
import FormLayout from "../FormLayout/FormLayout";
import FormHeader from "../FormHeader/FormHeader";
import SubText from "../SubText/SubText";
import FormError from "../ErrorMessage/ErrorMessage";
import Toast from "../Toast/Toast";
import { usePost } from "../../hooks/usePost";
import AuthUtility from "../../utility/AuthUtils";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


export default function LoginAlumni() {
    const Base_URL = import.meta.env.VITE_API_URL;
    const { data: user, loading, error, post } = usePost(`${Base_URL}/auth/login`);
    const [formErrors, setFormErrors] = useState(null);
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })

    return (
        <React.Fragment>
            <FormLayout>
                <FormHeader>LAHORE GARRISON UNIVERSITY ALUMNI PORTAL</FormHeader>
                <SubText>Fill Your Details To Continue</SubText>
                <InputField type="email" label="Enter Email Address" placeholder="email" value={credentials.email} onChange={(e) => {
                    setCredentials({ ...credentials, email: e.target.value })
                }} />
                <FormError errors={formErrors} errorKey="email" />

                <InputField type="password" label="Enter Password Here" value={credentials.password} placeholder="password"
                    onChange={(e) => {
                        setCredentials({ ...credentials, password: e.target.value })
                    }}
                />
                <FormError errors={formErrors} errorKey="password" />
                <ButtonComponent
                    disabled={loading}
                    onClick={async() => {
                      const res = await AuthUtility.handleLogin(credentials, post, setFormErrors)
                      if(res){
                        AuthUtility.navigateByRole(res.user,navigate)
                      }
                    }} >LogIn</ButtonComponent>

                <SubText>Are You a Former Student? <Link to='/register' >Register Now </Link> </SubText>
            </FormLayout>
            {error && <Toast type="error" message={error} />}
        </React.Fragment>
    )
}