import SidebarItem from "../SideBarItem/SideBarItem";
import SidebarNav from "../SidebarNav/SidebarNav";
import AuthorName from "../AuthorName/AuthorName";
import React, { useState } from "react";

export default function CoordinatorSideBar({ setActiveMenu }) {
  // State to track the active menu
  const [activeItem, setActiveItem] = useState("dashboard");

  // Handle item click
  const handleClick = (menu) => {
    setActiveItem(menu);      // Set active item
    setActiveMenu(menu);      // Notify parent
  };

  return (
    <SidebarNav>
      <AuthorName>
        <img src="../src/assets/logo.png" alt="" style={{ width: 90, height: 90 }}/>
        <h5 className="fw-bold text-success mt-3">Lahore Garrison University</h5>
      </AuthorName>
      <AuthorName></AuthorName>
      <SidebarItem
        icon="bi bi-house-door-fill"
        text="Dashboard"
        isActive={activeItem === "dashboard"}
        onClick={() => handleClick("dashboard")}
      />
      <SidebarItem
        icon="bi bi-people-fill"
        text="Alumni Data"
        isActive={activeItem === "alumniData"}
        onClick={() => handleClick("alumniData")}
      />
      <SidebarItem
        icon="bi bi-box-seam-fill"
        text="President"
        isActive={activeItem === "president"}
        onClick={() => handleClick("president")}
      />
      <SidebarItem
        icon="bi bi-file-post"
        text="Posts"
        isActive={activeItem === "posts"}
        onClick={() => handleClick("posts")}
      />
    </SidebarNav>
  );
}
