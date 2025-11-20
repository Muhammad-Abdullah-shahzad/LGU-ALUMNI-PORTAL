export default function LongCard({ heading, notifications,headKey,bodyKey }) {
  return (
    <div className="w-100 mb-4">
      <div className="card shadow-sm border-0 rounded-3 w-100">

        {/* HEADER */}
        <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center py-3 px-4">
          <h5 className="fw-bold mb-0">{heading}</h5>
            <button className="btn btn-link p-0 m-0 text-decoration-none" 
                    style={{ fontSize: "0.9rem" }}>
            View All
            </button>
        </div>

        {/* BODY */}
        <div className="card-body px-4 pb-4">
          {notifications.slice(0, 2).map((note, index) => (
            <div
              key={index}
              className="d-flex justify-content-between align-items-center p-3 mb-3 rounded-3"
              style={{ backgroundColor: "#f8f9fa" }}
            >
              {/* TEXT */}
              <div>
                <h6 className="fw-semibold mb-1">{note[headKey]}</h6>
                <p className="text-muted mb-0" style={{ fontSize: "0.85rem" }}>
                  {note[bodyKey]}
                </p>
              </div>

              {/* ACTION BUTTONS */}
              <div className="d-flex gap-2">
                <button className="btn btn-outline-success btn-sm px-3 rounded-1">
                  Accept
                </button>

                <button className="btn btn-outline-danger btn-sm px-3 rounded-1">
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
