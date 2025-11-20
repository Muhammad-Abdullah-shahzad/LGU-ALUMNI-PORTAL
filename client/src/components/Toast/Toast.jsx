import React, { useEffect, useRef } from "react";
import { Toast as BootstrapToast } from "bootstrap";

export default function Toast({ message, type = "success", delay = 5000 }) {
  const toastRef = useRef(null);

  useEffect(() => {
    if (toastRef.current) {
      const toast = new BootstrapToast(toastRef.current, { autohide: true, delay });
      toast.show();
    }
  }, [message, delay]);

  const bgColor = type === "success" ? "bg-success" : "bg-danger";

  return (
    <div
      className="toast-container position-fixed bottom-0 end-0 p-3"
      style={{ zIndex: 11 }}
    >
      <div
        ref={toastRef}
        className={`toast align-items-center text-white ${bgColor} border-0`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="d-flex">
          <div className="toast-body">{message}</div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>
  );
}
