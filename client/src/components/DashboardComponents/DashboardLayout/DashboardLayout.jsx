import { useState } from "react";

export default function DashboardLayout(props) {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* SIDEBAR (Bootstrap Offcanvas for mobile) */}
        <div
          className="col-md-3 col-lg-2 d-none d-md-block bg-light border-end"
          style={{ minHeight: "100vh" }}
        >
          {props.children[0]}
        </div>

        {/* MOBILE SIDEBAR (Offcanvas) */}
        <div
          className="offcanvas offcanvas-start"
          tabIndex="-1"
          id="mobileSidebar"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title">Menu</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
            ></button>
          </div>
          <div className="offcanvas-body">
            {props.children[0]}
          </div>
        </div>

        {/* MAIN CONTENT */}
        <main className="col-md-9 col-lg-10 p-4">

          {/* Mobile Toggle Button */}
          <button
            className="btn btn-success d-md-none mb-3"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileSidebar"
          >
            <i className="bi bi-list"></i>
          </button>

          {props.children[1]}
        </main>
      </div>
    </div>
  );
}
