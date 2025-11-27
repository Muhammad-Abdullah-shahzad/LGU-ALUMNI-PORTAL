// DashboardHeader.jsx
import React, { useEffect, useState } from "react";

export default function DashboardHeader({ title, onLogout }) {
  const [displayedTitle, setDisplayedTitle] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedTitle(title.slice(0, index + 1));
      index++;
      if (index === title.length) clearInterval(interval);
    }, 100); // adjust typing speed here
    return () => clearInterval(interval);
  }, [title]);

  return (
    <header
      style={{
        zIndex: 1000,
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1.5rem",
        backgroundColor: "#ffffff", // keep it matching the page
      }}
    >
      {/* Typing title */}
      <h1
        style={{
          margin: 0,
          fontSize: "1.5rem",
          fontWeight: "600",
          letterSpacing: "0.5px",
          whiteSpace: "nowrap",
        }}
      >
        {displayedTitle}
        <span style={{ borderRight: "2px solid #000", marginLeft: "2px" }} />
      </h1>

      {/* Logout button */}
      <div>
      <button
        type="button"
        className="btn btn-success btn-sm rounded-circle me-2"
        style={{ width: 36, height: 36 }}
        title="Delete"
        // onClick={}
      >
        <i className="bi bi-bell-fill"></i>
      </button>
      <button className="btn btn-success " onClick={onLogout}>
        <i className="bi bi-arrow-right pe-2"></i>
        Logout 
      </button>        
      </div>
    </header>
  );
}
