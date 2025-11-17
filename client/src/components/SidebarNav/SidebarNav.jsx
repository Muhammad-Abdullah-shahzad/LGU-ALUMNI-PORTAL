// SidebarNav.jsx
import React, { useState } from 'react';

function SidebarNav(props) {
  return (
    <ul className="nav nav-pills flex-column mb-auto">
      {
        props.children
      }
    </ul>
  );
}

export default SidebarNav;