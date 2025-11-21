// SidebarItem.jsx
import React from 'react';

function SidebarItem({ icon, text, isActive, onClick }) {
  return (
    <li className="nav-item mb-1">
      <a
        className={`nav-link d-flex align-items-center ${isActive ? 'active bg-success text-white' : 'text-dark'}`}
        onClick={onClick}
        style={{ padding: '0.75rem 1rem', borderRadius: '0.3rem', cursor: 'pointer' }}
      >
        <i className={`${icon} me-2`}></i>
        {text}
      </a>
    </li>
  );
}

export default SidebarItem;