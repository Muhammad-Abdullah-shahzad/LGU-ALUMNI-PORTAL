import React, { useEffect, useState } from "react";
import ButtonComponent from "../Button/Button";
import InputField from "../InputField/InputField";
import FormLayout from "../FormLayout/FormLayout";
import FormHeader from "../FormHeader/FormHeader";
import SubText from "../SubText/SubText";
import FormError from "../ErrorMessage/ErrorMessage";
import Toast from "../Toast/Toast";
import { usePost } from "../../hooks/usePost";
import AuthUtility from "../../utility/AuthUtils";
import { useNavigate, Link } from "react-router-dom";
import img from "../../assets/registerimg.png";
import "./auth.css";

export default function LoginAlumni() {

  const Base_URL = import.meta.env.VITE_API_URL;
  const { post, loading, error } = usePost(`${Base_URL}/auth/login`);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.token && localStorage.user && localStorage.user && localStorage.user.active) {
      const user = JSON.parse(localStorage.user)
      navigate(`/${user.role}/dashboard`)
    }
  }, [])

  if (loading) return <div>Loading...</div>; // You can replace with Loader component if you want

  return (
    <div className="auth-container">
      {/* LEFT SECTION - Fixed Background */}
      <div
        className="auth-left"
        style={{ backgroundImage: `url(${img})` }}
      >
        <h1>LGU Alumni Portal</h1>
        <p>
          Welcome back! Log in to access your alumni <br /> account and connect with our network.
        </p>
      </div>

      {/* RIGHT SECTION - Scrollable Form */}
      <div className="auth-right">
        <div className="auth-form-wrapper">
          <FormLayout className="auth-spacer-medium">
            <FormHeader>Alumni Login</FormHeader>
            <SubText>Fill your details to continue</SubText>

            {/* Email */}
            <div style={{ marginBottom: "20px" }}>
              <InputField
                type="email"
                label="Email Address"
                placeholder="Enter your email"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
              />
              <FormError errors={formErrors} errorKey="email" />
            </div>

            {/* Password */}
            <div style={{ marginBottom: "20px" }}>
              <InputField
                type="password"
                label="Password"
                placeholder="Enter your password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
              />
              <FormError errors={formErrors} errorKey="password" />
            </div>

            {/* Login Button */}
            <div style={{ marginBottom: "20px" }}>
              <ButtonComponent
                type="button"
                onClick={async () => {
                  const res = await AuthUtility.handleLogin(
                    credentials,
                    post,
                    setFormErrors
                  );
                  if (res) AuthUtility.navigateByRole(res.user, navigate);
                }}
              >
                Log In
              </ButtonComponent>
            </div>

            {error && <Toast type="error" message={error} />}

            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <SubText>
                Are you a former student? <Link to="/register">Register Now</Link>
              </SubText>
            </div>
          </FormLayout>
        </div>
      </div>
    </div>
  );
}
