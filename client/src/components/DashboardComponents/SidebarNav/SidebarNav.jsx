// SidebarNav.jsx
import React, { useState } from 'react';

function SidebarNav(props) {
  return (
    <div 
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        maxWidth: "250px",     // Adjust size
        height: "100vh",
        overflowY: "auto",
        background: "#fff",
        borderRight: "1px solid #e5e5e5",
        padding: "10px"
      }}
    >
      <ul className="nav nav-pills flex-column mb-auto">
        {props.children}
      </ul>
    </div>
  );
}


export default SidebarNav;