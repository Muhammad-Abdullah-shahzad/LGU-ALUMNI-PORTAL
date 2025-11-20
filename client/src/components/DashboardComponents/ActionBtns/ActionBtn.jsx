import React from "react";
/**
 * Reusable Bootstrap Action Button
 * Props:
 * - label: Button text
 * - action: "add" | "delete" | "update" | "custom"
 * - onClick: Click handler function
 * - icon: React element (Bootstrap icon)
 * - disabled: boolean
 * - className: additional custom classes
 */
export default function ActionBtn({
children,
  action = "custom",
  onClick,
  icon = null,
  disabled = false,
  className = "",
  ...rest
}) {
  // Map action type to Bootstrap button classes
  const actionClassMap = {
    add: "btn btn-success",
    delete: "btn btn-danger",
    update: "btn btn-primary",
    custom: "btn btn-secondary",
  };

  const btnClass = `${actionClassMap[action] || actionClassMap["custom"]} d-flex align-items-center gap-2 ${className}`;

  return (
    <button type="button" className={btnClass} onClick={onClick} disabled={disabled} {...rest}  >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}
