import React from "react";
import LoginAlumni from "./components/auth/LoginAlumni";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

export default function App() {
  return (
    <React.Fragment>
      <ErrorBoundary>
        <LoginAlumni/>
      </ErrorBoundary>
    </React.Fragment>
  )
}