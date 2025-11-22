import React from "react";
import LoginAlumni from "./components/auth/LoginAlumni";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import RegisterAlumni from "./components/auth/RegisterAlumni";
import AdminDashboard from "./components/Dashboards/AdminDashboard";



import { Routes, Route } from "react-router-dom";
export default function App() {
  return (
    <React.Fragment>
      <ErrorBoundary>
        <Routes>
          <Route path="/login" element={<LoginAlumni/>} />
          <Route path="/" element={<LoginAlumni />} />
          <Route path="/register" element={<RegisterAlumni />} />
          <Route path="/admin/dashboard" element={<AdminDashboard/>} />
        </Routes>
      </ErrorBoundary>
    </React.Fragment>
  )
}

