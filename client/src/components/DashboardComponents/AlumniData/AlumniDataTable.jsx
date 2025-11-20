import React, { useState } from "react";
import "./alumniDataTable.css";
import {useFetch} from "../../../hooks/useFetch";
import Loader from "../../Loader/Loader";

export default function AlumniDataWrapper() {
 const Base_URL = import.meta.env.VITE_API_URL;
  const { data, loading, error } = useFetch(`${Base_URL}/user/alumni`);
  const [search, setSearch] = useState("");

   if (loading) {
    return <Loader />;
  }

  // Filter alumni by name, batch, degree, or roll no
  const filtered = data.users.filter((alumni) =>
    (alumni.firstName +alumni.lastName || "").toLowerCase().includes(search.toLowerCase()) ||
    (`${alumni.batch}/${alumni.degree}/${alumni.rollNo}` || "").toLowerCase().includes(search.toLowerCase()) 
  );

  return (
    <div className="container-fluid">

      <div className="data-toolbar">

        <div className="data-search">
          <input
            type="text"
            placeholder="Search alumni..."
            className="form-control"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button className="circle-btn"><i className="bi bi-grid"></i></button>
        <button className="circle-btn"><i className="bi bi-list-ul"></i></button>
        <button className="circle-btn"><i className="bi bi-three-dots"></i></button>
      </div>

      <div className="table-card card shadow-sm">
        <table className="table table-striped table-hover mb-0">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Roll No</th>
              <th>Batch</th>
              <th>Degree</th>
              <th>Status</th>
              <th>Company</th>
              <th>Job Title</th>
              <th>Year</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center py-4">
                  No alumni found
                </td>
              </tr>
            ) : (
              filtered.map((alumni, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{alumni.firstName + alumni.lastName|| "N/A"}</td>
                  <td>{alumni.rollNo || "N/A"}</td>
                  <td>{alumni.batch || "N/A"}</td>
                  <td>{alumni.degree || "N/A"}</td>
                  <td>
                    <span
                      className={`badge ${alumni.employmentStatus === "employed"
                          ? "bg-success"
                          : "bg-danger"
                        }`}
                    >
                      {alumni.employmentStatus}
                    </span>
                  </td>
                  <td>{alumni.companyName || "--"}</td>
                  <td>{alumni.jobTitle || "--"}</td>
                  <td>{alumni.graduationYear || "--"}</td>

                  {/* Only Edit + Delete */}
                  <td className="action-icons">
                    <i className="bi bi-pencil-square"></i>
                    <i className="bi bi-trash"></i>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
