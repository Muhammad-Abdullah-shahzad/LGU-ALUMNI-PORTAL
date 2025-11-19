export default function StatsCard({ title, value, icon, color }) {
  return (
    <div className="col-md-3 col-sm-6 mb-4">
      <div className="card shadow-sm border-0 rounded-3">
        <div className="card-body d-flex align-items-center">
          {/* ICON */}
          <div
            className={`rounded-circle d-flex align-items-center justify-content-center me-3`}
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: color || "#e9ecef",
            }}
          >
            <i className={`${icon} text-white fs-4`}></i>
          </div>

          {/* TEXT */}
          <div>
            <h6 className="text-muted mb-1">{title}</h6>
            <h4 className="fw-bold mb-0">{value}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
