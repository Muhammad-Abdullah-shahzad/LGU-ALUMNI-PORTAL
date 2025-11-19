import SidebarItem from "../SideBarItem/SideBarItem";
import SidebarNav from "../SidebarNav/SidebarNav";
import AuthorName from "../AuthorName/AuthorName";
import React, { useState } from "react";

export default function AdminSideBar() {
    const [activeSection, setActiveSection] = useState("Dashboard");
    return (
        <SidebarNav>
            <AuthorName>Admin Dashboard</AuthorName>
            <SidebarItem
                icon="bi bi-house-door-fill"
                text="Dashboard"
                isActive={true}
                onClick={() => setActiveSection("Dashboard")}
            />
            <SidebarItem
                icon="bi bi-people-fill"
                text="Alumni Data"
                link="#users"
                isActive={false}
                onClick={()=>setActiveSection('Users')}
            />
            <SidebarItem
                icon="bi bi-box-seam-fill"
                text="Coordinators"

                isActive={false}
                onClick={()=>setActiveSection('Products')}

            />
            <SidebarItem
                icon="bi bi-file-post"
                text="Posts"

                isActive={false}
                onClick={()=>setActiveSection('Orders')}

            />
            <SidebarItem
                icon="bi bi-gear-fill"
                text="Notifications"
           
                isActive={false}
                onClick={()=>setActiveSection('Settings')}
            />
        </SidebarNav>
    );
}