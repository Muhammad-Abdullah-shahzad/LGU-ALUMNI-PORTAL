import React from "react";
import LoginAlumni from "./components/auth/LoginAlumni";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import RegisterAlumni from "./components/auth/RegisterAlumni";
import Loader from "./components/Loader/Loader";
import AdminSideBar from "./components/DashboardComponents/SideBar/AdminSideBar";
import AdminDashboard from "./components/Dashboards/AdminDashboard";


export default function App() {
  return (
    <React.Fragment>
      <ErrorBoundary>
        <AdminDashboard />
      </ErrorBoundary>
    </React.Fragment>
  )
}