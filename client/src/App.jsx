import React from "react";
import LoginAlumni from "./components/auth/LoginAlumni";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import RegisterAlumni from "./components/auth/RegisterAlumni";
export default function App() {
  return (
    <React.Fragment>
      <ErrorBoundary>
        <RegisterAlumni/>
      </ErrorBoundary>
    </React.Fragment>
  )
}