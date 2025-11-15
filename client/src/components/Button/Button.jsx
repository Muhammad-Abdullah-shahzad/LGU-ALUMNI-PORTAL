import React from "react";
/**
 * Reusable Button component that accepts a 'style' prop for inline CSS,
 * a 'className' prop for Bootstrap/other CSS classes,
 * and 'children' for flexible content (text, icons, etc.).
 *
 * Props it would typically accept (but not used here for no-logic UI):
 * type, onClick, disabled, label, children, className, style
 */

export default function ButtonComponent(props) {
  // 1. Set the button type (default to 'button')
  const buttonType = props.type || "button";

  // 2. Set the default Bootstrap classes, allowing the user to override/add more
  // using the 'className' prop.
  const defaultClasses = "btn w-100";
  const userClasses = props.className || "btn-success";
  const finalClasses = `${defaultClasses} ${userClasses}`;
  const btnUserStyles = props.style || {}
  return (
    <button
      type={buttonType}
      className={finalClasses}
      // 3. Directly pass the 'style' prop for inline CSS overrides
      style={btnUserStyles}
      // 4. Use children for the content inside the button
      // If children are not provided, use a default label
      disabled={props.disabled} // Placeholder for the disabled prop
    >
      {/* Placeholder content using children or a default label */}
      {props.children || 'Click Me'}
    </button>
  );
}