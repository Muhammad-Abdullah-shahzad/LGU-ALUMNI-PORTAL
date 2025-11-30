import SidebarItem from "../SideBarItem/SideBarItem";
import SidebarNav from "../SidebarNav/SidebarNav";
import AuthorName from "../AuthorName/AuthorName";
import React, { useState } from "react";

export default function PresidentSideBar({ setActiveMenu }) {
    // State to track the active menu
    const [activeItem, setActiveItem] = useState("posts");

    // Handle item click
    const handleClick = (menu) => {
        setActiveItem(menu);      // Set active item
        setActiveMenu(menu);      // Notify parent
    };

    return (
        <SidebarNav>

            <AuthorName>
                <img src="../src/assets/logo.png" alt="" style={{ width: 90, height: 90 }} />
                <h5 className="fw-bold text-success mt-3">Lahore Garrison University</h5>
            </AuthorName>

            <AuthorName></AuthorName>

            <SidebarItem
                icon="bi bi-house-door-fill"
                text="Posts"
                isActive={activeItem === "posts"}
                onClick={() => handleClick("posts")}
            />

            <SidebarItem
                icon="bi bi-file-post"
                text="Discussion Forum"
                isActive={activeItem === "forum"}
                onClick={() => handleClick("forum")}
            />

            <SidebarItem
                icon="bi bi-file-post"
                text="Profile"
                isActive={activeItem === "profile"}
                onClick={() => handleClick("profile")}
            />

        </SidebarNav>
    );
}
