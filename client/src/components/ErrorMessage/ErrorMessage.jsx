import React from 'react';

/**
 * Reusable component to display a specific error message for a form field.
 * * @param {object} props - Component properties
 * @param {object} props.errors - The entire error object (e.g., { email: 'Invalid format', password: 'Too short' })
 * @param {string} props.errorKey - The specific key/field name to check in the errors object
 * @param {string} [props.className] - Optional additional CSS class for styling
 */
export default function FormError({ errors, errorKey, className ,children}) {
  // 1. Check if the errors object is provided and if it contains the specific errorKey
  const errorMessage = errors?.[errorKey];
  
  // 2. If no error message exists for this key, return null to render nothing
  if (!errorMessage) {
    return null;
  }

  // 3. If an error exists, render the Bootstrap Alert component
  return (
    <div className={`${className || ''}`} role="alert">
      <small className="text-danger">
        <sup>*</sup>
        {children || errorMessage}
      </small>
    </div>
  );
}