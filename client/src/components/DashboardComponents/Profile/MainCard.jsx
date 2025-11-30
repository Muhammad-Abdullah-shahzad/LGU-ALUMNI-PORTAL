import React from "react";

export default function MainCard({ data }) {
  const {user} = data; 
  const {
    firstName,
    lastName,
    email,
    cnic,
    batch,
    degree,
    rollNo,
    department,
  } = user || {};

  return (
    <div className="card shadow-sm border-0 rounded-4 p-3" style={{ width: "100%", maxWidth: "360px" }}>
      {/* Avatar */}
      <div className="text-center">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpCyiaNeT3jlNujMHNEVfPj7B6tCQiOW6Wag&s"
          alt="profile"
          className="rounded-circle mb-3"
          width="120"
          height="120"
        />
      </div>

      {/* Title */}
      <h5 className="fw-bold text-center mb-4">My Profile</h5>

      {/* Info */}
      <div className="d-flex flex-column gap-2 px-2">

        <div className="d-flex align-items-center">
          <i className="bi bi-person-fill text-secondary me-2"></i>
          <span className="fw-semibold">{firstName} {lastName}</span>
        </div>

        <div className="d-flex align-items-center">
          <i className="bi bi-envelope-fill text-secondary me-2"></i>
          <span>{email}</span>
        </div>

        <div className="d-flex align-items-center">
          <i className="bi bi-credit-card-2-front-fill text-secondary me-2"></i>
          <span>{cnic || "N/A"}</span>
        </div>

        <div className="d-flex align-items-center">
          <i className="bi bi-hash text-secondary me-2"></i>
          <span>Roll No: {rollNo || "N/A"}</span>
        </div>

        <div className="d-flex align-items-center">
          <i className="bi bi-mortarboard-fill text-secondary me-2"></i>
          <span>{degree} Batch {batch || "N/A"}</span>
        </div>

        <div className="d-flex align-items-center">
          <i className="bi bi-building text-secondary me-2"></i>
          <span>{department}</span>
        </div>

      </div>

      {/* Divider */}
      <hr className="my-3" />

      {/* Alumni Status */}
      <div className="d-flex align-items-center justify-content-between px-2">
        <span className="fw-semibold">Profile Status</span>
        <span className="badge bg-success p-2 rounded-pill">
          <i className="bi bi-check-circle"></i> Active
        </span>
      </div>

      {/* Button */}
      {/* <div className="mt-4 text-center">
        <button className="btn btn-outline-success px-4 rounded-pill">Edit Your Profile</button>
      </div> */}
    </div>
  );
}
