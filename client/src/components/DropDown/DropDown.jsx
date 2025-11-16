import React from "react";

export default function DropDown({ children, value, onChange, className }) {
  return (
    <select
     required
      className={`form-select mt-1 mb-1 shadow-none ${className || ""}`}
      value={value}
      onChange={onChange}
    >
      {children}
    </select>
  );
}

DropDown.Option = function DropDownOption({ value, children }) {
  return <option value={value}>{children}</option>;
};

