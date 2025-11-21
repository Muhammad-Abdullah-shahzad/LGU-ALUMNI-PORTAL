import React, { useState } from "react";
import "./alumniDataTable.css";
import { useFetch } from "../../../hooks/useFetch";
import Loader from "../../Loader/Loader";

export default function AlumniDataWrapper() {
  const Base_URL = import.meta.env.VITE_API_URL;
  const { data, loading } = useFetch(`${Base_URL}/user/alumni`);
  const [search, setSearch] = useState("");


  const handleDownloadCSV = () => {
  const listToDownload = filtered.length > 0 ? filtered : data.users;

  if (!listToDownload || listToDownload.length === 0) {
    alert("No alumni data available to download.");
    return;
  }

  // CSV Header
  const headers = [
    "Name",
    "Roll No",
    "Batch",
    "Degree",
    "Status",
    "Company",
    "Job Title",
    "Graduation Year"
  ];

  // Convert Alumni Array to CSV Rows
  const rows = listToDownload.map((a) => [
    `${a.firstName || ""} ${a.lastName || ""}`,
    a.rollNo || "",
    a.batch || "",
    a.degree || "",
    a.employmentStatus || "",
    a.companyName || "",
    a.jobTitle || "",
    a.graduationYear || ""
  ]);

  // Build CSV String
  const csvContent =
    [headers, ...rows]
      .map((row) =>
        row
          .map((value) => `"${value?.toString().replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

  // Create CSV File Blob
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  // Trigger Download
  const a = document.createElement("a");
  a.href = url;
  a.download = "alumni_list.csv";
  a.click();

  URL.revokeObjectURL(url);
};



  // Toggle filter panel manually
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    degree: "",
    batch: "",
    status: "",
    year: "",
    company: "",
  });

  if (loading) return <Loader />;

  const users = data?.users || [];

  const degrees = [...new Set(users.map((u) => u.degree))];
  const batches = [...new Set(users.map((u) => u.batch))];
  const companies = [...new Set(users.map((u) => u.companyName).filter(Boolean))];
  const years = [...new Set(users.map((u) => u.graduationYear))];

  const filtered = users.filter((alumni) => {
    const matchesSearch =
      (alumni.firstName + " " + alumni.lastName)
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      `${alumni.batch}/${alumni.degree}/${alumni.rollNo}`
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesDegree = filters.degree ? alumni.degree === filters.degree : true;
    const matchesBatch = filters.batch ? alumni.batch === filters.batch : true;
    const matchesStatus = filters.status
      ? alumni.employmentStatus === filters.status
      : true;
    const matchesYear = filters.year ? alumni.graduationYear == filters.year : true;
    const matchesCompany = filters.company
      ? alumni.companyName === filters.company
      : true;

    return (
      matchesSearch &&
      matchesDegree &&
      matchesBatch &&
      matchesStatus &&
      matchesYear &&
      matchesCompany
    );
  });

  return (
    <div className="container-fluid alumni-wrapper">

      {/* TOP BAR */}
      <div className="top-bar glass-card shadow-sm">

        {/* Search */}
        <div className="search-box full-width">
          <i className="bi bi-search"></i>
          <input
            className="search-input"
            placeholder="Search alumni..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filter Btn at Right End */}
        <button
          className="filter-toggle-btn"
          onClick={() => setShowFilters(!showFilters)}
        >
          <i className="bi bi-sliders"></i> Filters
        </button>
        <button
          className="filter-toggle-btn"
          onClick={handleDownloadCSV}
        >
          <i className="bi bi-download"></i> Download
        </button>
      </div>

      {/* FILTER PANEL */}
      {showFilters && (
        <div className="filter-panel glass-card shadow-sm mt-3">

          <div className="row g-3">

            <div className="col-md-2">
              <label className="filter-label">Degree</label>
              <select
                className="filter-select"
                value={filters.degree}
                onChange={(e) =>
                  setFilters({ ...filters, degree: e.target.value })
                }
              >
                <option value="">All</option>
                {degrees.map((d, i) => (
                  <option key={i} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div className="col-md-2">
              <label className="filter-label">Batch</label>
              <select
                className="filter-select"
                value={filters.batch}
                onChange={(e) =>
                  setFilters({ ...filters, batch: e.target.value })
                }
              >
                <option value="">All</option>
                {batches.map((b, i) => (
                  <option key={i} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div className="col-md-2">
              <label className="filter-label">Status</label>
              <select
                className="filter-select"
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
              >
                <option value="">All</option>
                <option value="employed">Employed</option>
                <option value="unemployed">Unemployed</option>
              </select>
            </div>

            <div className="col-md-2">
              <label className="filter-label">Year</label>
              <select
                className="filter-select"
                value={filters.year}
                onChange={(e) =>
                  setFilters({ ...filters, year: e.target.value })
                }
              >
                <option value="">All</option>
                {years.map((y, i) => (
                  <option key={i} value={y}>{y}</option>
                ))}
              </select>
            </div>

            <div className="col-md-2">
              <label className="filter-label">Company</label>
              <select
                className="filter-select"
                value={filters.company}
                onChange={(e) =>
                  setFilters({ ...filters, company: e.target.value })
                }
              >
                <option value="">All</option>
                {companies.map((c, i) => (
                  <option key={i} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="col-md-2">
              <label className="filter-label">&nbsp;</label>
              <button
                className="reset-btn w-100"
                onClick={() =>
                  setFilters({
                    degree: "",
                    batch: "",
                    status: "",
                    year: "",
                    company: "",
                  })
                }
              >
                Reset
              </button>
            </div>

          </div>
        </div>
      )}

      {/* TABLE */}
      <div className="table-card glass-card shadow-sm mt-4">
        <table className="table interactive-table">
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
                  <td>{alumni.firstName + " " + alumni.lastName}</td>
                  <td>{alumni.rollNo}</td>
                  <td>{alumni.batch}</td>
                  <td>{alumni.degree}</td>

                  <td>
                    <span
                      className={`status-badge ${
                        alumni.employmentStatus === "employed"
                          ? "status-employed"
                          : "status-unemployed"
                      }`}
                    >
                      {alumni.employmentStatus}
                    </span>
                  </td>

                  <td>{alumni.companyName || "--"}</td>
                  <td>{alumni.jobTitle || "--"}</td>
                  <td>{alumni.graduationYear}</td>

                  <td className="action-icons">
                    <i className="bi bi-pencil-square edit-icon"></i>
                    <i className="bi bi-trash delete-icon"></i>
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
