import React from "react";

/**
 * Reusable UI component for displaying a form title and subtitle.
 * Props it would typically accept (but not used here for no-logic UI):
 * title, subtitle, alignment (e.g., 'text-center')
 */
export default function FormHeader(props) {
    // Placeholder values for the UI
    const subtitleText = props.subtitle || "Please fill out the details below to continue.";
    const alignmentClass = props.alignment || "text-center"; // Bootstrap class for alignment

    return (
        <div className={`mt-5 ${alignmentClass}`}>
            {/* Main title for the form */}
            <h2 className={`text-success fw-bold ${props.textStyle}`}>
                {props.children || "your text here"}
            </h2>
        </div>
    );
}