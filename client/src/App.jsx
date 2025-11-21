import React from "react";
import LoginAlumni from "./components/auth/LoginAlumni";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import RegisterAlumni from "./components/auth/RegisterAlumni";
import Loader from "./components/Loader/Loader";
import AdminSideBar from "./components/DashboardComponents/SideBar/AdminSideBar";
import AdminDashboard from "./components/Dashboards/AdminDashboard";
import PostsSection from "./components/DashboardComponents/PostsComponents/PostSection";

export default function App() {
  return (
    <React.Fragment>
      <ErrorBoundary>
        {/* <AdminDashboard /> */}
          <AdminDashboard/>
      </ErrorBoundary>
    </React.Fragment>
  )
}