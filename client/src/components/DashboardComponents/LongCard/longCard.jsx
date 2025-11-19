export default function LongCard({ heading, notifications }) {
  return (
    <div className="w-100 mb-4">
      <div className="card shadow-sm border-0 rounded-3 w-100">

        {/* HEADER */}
        <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center py-3 px-4">
          <h5 className="fw-bold mb-0">{heading}</h5>
          <button className="btn btn-sm btn-outline-primary rounded-1 px-3">
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
                <h6 className="fw-semibold mb-1">{note.title}</h6>
                <p className="text-muted mb-0" style={{ fontSize: "0.85rem" }}>
                  {note.message}
                </p>
              </div>

              {/* ACTION BUTTONS */}
              <div className="d-flex gap-2">
                <button className="btn btn-success btn-sm px-3 rounded-1">
                  Accept
                </button>

                <button className="btn btn-danger btn-sm px-3 rounded-1">
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
