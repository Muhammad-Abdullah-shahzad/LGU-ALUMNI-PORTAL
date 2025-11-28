export default function StatsCard({ title, value, icon, bgImage }) {
  return (
    <div className="col-md-12 col-sm-12 col-lg-4 mb-4">
      <div
        className="card border-0 shadow-sm rounded-4 p-0 overflow-hidden"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "150px",
          position: "relative",
        }}
      >
        {/* Top bar with icon + button */}

        <div className="d-flex justify-content-between align-items-center px-3 pt-3">
          <div
            className="d-flex align-items-center justify-content-center rounded-circle"
            style={{
              width: "36px",
              height: "36px",
              background: "rgba(255,255,255,0.25)",
              backdropFilter: "blur(4px)",
            }}
          >
            <i className={`${icon} text-white small`}></i>
          </div>
        </div>

        {/* Text Content */}
        <div className="px-3 mt-3">
          <p className="text-white-50 mb-0" style={{ fontSize: "0.75rem" }}>
          </p>
          <h6 className="text-white mb-1">{title}</h6>
          <h2 className="fw-bold text-white">{value}</h2>
        </div>

        {/* Optional soft circular overlay */}
        <div
          style={{
            position: "absolute",
            bottom: "-20px",
            right: "-20px",
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.15)",
          }}
        ></div>
      </div>
    </div>
  );
}
