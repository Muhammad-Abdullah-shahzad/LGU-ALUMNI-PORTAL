import React from "react";

/**
 * Reusable layout component that wraps all individual form elements.
 * It provides the <form> structure and basic spacing/margin.
 *
 * Props it would typically accept (but not used here for no-logic UI):
 * onSubmit, className (for custom styling)
 */
export default function FormLayout({ children, className, style }) {
  // Set a default Bootstrap class for padding/margin, allowing override
  const defaultClasses = "p-4 ";
  const finalClasses = className ? `${defaultClasses} ${className}` : defaultClasses;

  return (
    // Use the Bootstrap container classes to center the form on the page for demonstration
   <div className="container-fluid d-flex justify-content-center align-items-center vh-100"  >
   <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <form
            className={finalClasses}
            style={style}
            // Add a placeholder event handler (no logic)
            onSubmit={(e) => { e.preventDefault(); console.log("Form submitted (UI-only)"); }}
          >
            {/* The children prop renders all the components passed inside the FormLayout */}
            {children}
          </form>
        </div>
      </div>
    </div>
   </div>

  );
}