import React from "react";

/**
 * Reusable UI for a standard form input field.
 * Props it would typically accept (but not used here for no-logic UI):
 * type, id, label, placeholder, value, onChange
 */
export default function InputField(props) {
  // Use 'text' as a default type, though a parent component should pass it.
  const inputType = props.type || "text";

  return (
    <div className="mb-3">
      <label htmlFor={props.id} className="form-label">
        {/* Placeholder for the label text */}
        {props.label}
      </label>
      <input
       onChange={event=>props.onChange(event)}
        type={inputType}
        style={{boxShadow:'none'}}
        className="form-control"
        id={props.id}
        placeholder={props.placeholder || "Enter value"}
        value={props.value}
        required
      />
    </div>
  );
}