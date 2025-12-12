import React from "react";
import LoginAlumni from "./components/auth/LoginAlumni";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import AdminDashboard from "./components/Dashboards/AdminDashboard";
import FallBack from "./components/FallBack/FallBack";
import CoordinatorDashboard from "./components/Dashboards/CoordinatorDashboard";
import RegisterAlumni from "./components/auth/RegisterAlumni";
import GraduateExitForm from "./components/auth/graduateExitForm";
import InternshipEmployerFeedbackForm from "./components/auth/internshipEmployerFeedbackForm";
import EmployerSurvey from "./components/auth/employersSurvey";
import AlumniSurvey from "./components/auth/alumniSurvey";
import AlumniDashboard from "./components/Dashboards/AlumniDashboard";
import PresidentDashboard from "./components/Dashboards/PresidentDashboard";
import UserProfile from "./components/DashboardComponents/Profile/UserProfile";

import { Routes, Route } from "react-router-dom";
export default function App() {
  return (
    <React.Fragment>
      <ErrorBoundary>
        <Routes>
          <Route path="/coordinator/dashboard" element={< CoordinatorDashboard />} />
          <Route path="/alumni/pending" element={<FallBack />} />
          <Route path="/login" element={<LoginAlumni />} />
          <Route path="/" element={<LoginAlumni />} />
          <Route path="/register" element={<RegisterAlumni />} />
          <Route path="/register/graduateExitSurvey" element={<GraduateExitForm />} />
          {/* <Route path="/register/form2" element={<InternshipEmployerFeedbackForm />} />
          <Route path="/register/form3" element={<EmployerSurvey />} /> */}
          <Route path="/register/annex" element={<AlumniSurvey />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/alumni/dashboard" element={<AlumniDashboard />} />
          <Route path="/president/dashboard" element={<PresidentDashboard />} />
          <Route path="/profile/:id" element={<UserProfile />} />
        </Routes>
      </ErrorBoundary>
    </React.Fragment>
  )
}