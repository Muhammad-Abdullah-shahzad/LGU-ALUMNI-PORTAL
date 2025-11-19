// SidebarNav.jsx
import React, { useState } from 'react';

function SidebarNav(props) {
  return (
    <ul className="nav nav-pills flex-column mb-auto justify-content-center">
      {
        props.children
      }
    </ul>
  );
}

export default SidebarNav;