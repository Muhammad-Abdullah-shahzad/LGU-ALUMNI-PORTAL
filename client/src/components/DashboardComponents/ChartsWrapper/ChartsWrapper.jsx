import React from "react";

export default function ChartWrapper({ title, children }) {
  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card shadow-sm border-0 rounded-3 h-100">
        <div className="card-body d-flex flex-column">
          {/* CARD TITLE */}
          {title && <h5 className="card-title mb-3">{title}</h5>}

          {/* CHART */}
          <div className="flex-grow-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
