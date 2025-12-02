// SidebarNav.jsx
import React, { useState } from 'react';

function SidebarNav(props) {
  return (
    <div 
      style={{
 
        top: 0,
        left: 0,
       position:"fixed",
        height: "100vh",
        width:"250px",
        background: "#fff",

        padding: "10px"
      }}
    >
      <ul className="nav nav-pills flex-column mb-auto ">
        {props.children}
      </ul>
    </div>
  );
}


export default SidebarNav;