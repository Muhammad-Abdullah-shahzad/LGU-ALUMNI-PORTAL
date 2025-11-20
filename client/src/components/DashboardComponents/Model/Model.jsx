import React from "react";

/**
 * Reusable Bootstrap Modal
 * Props:
 * - id: unique ID for modal
 * - title: modal title
 * - children: any React elements (inputs, buttons, etc.)
 * - onSubmit: function to handle submit event
 */
export default function Modal({ id, title = "Modal Title", children, onSubmit }) {
  return (
    <div
      className="modal fade"
      id={id}
      tabIndex="-1"
      aria-labelledby={`${id}Label`}
      aria-hidden="true"
      data-bs-backdrop="false"  // <-- disables the overlay
      data-bs-keyboard="false"  // optional: disables ESC key closing
    >
      <div className="modal-dialog">
        <div className="modal-content">

          {/* Header */}
          <div className="modal-header">
            <h5 className="modal-title" id={`${id}Label`}>
              {title}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit}>
            <div className="modal-body">{children}</div>

            <div className="modal-footer">
              {/* Optional buttons can go here */}
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}
