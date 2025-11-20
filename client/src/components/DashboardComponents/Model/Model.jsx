import React from "react";

/**
 * Reusable Bootstrap Modal
 * Props:
 * - id: unique ID for modal
 * - title: modal title
 * - children: any React elements (inputs, buttons, etc.)
 */
export default function Modal({ id, title = "Modal Title", children }){
  return (
    <div
     
      className="modal fade"
      id={id}
      tabIndex="-1"
      aria-labelledby={`${id}Label`}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          {/* Modal Header */}
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

          {/* Modal Body */}
          <div className="modal-body">{children}</div>

          {/* Optional Modal Footer */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
