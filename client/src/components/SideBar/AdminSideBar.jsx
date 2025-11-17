import SidebarItem from "../SideBarItem/SideBarItem";
import SidebarNav from "../SidebarNav/SidebarNav";
import React, { useState } from "react";

export default function AdminSideBar() {
    const [activeSection, setActiveSection] = useState("Dashboard");
    return (
        <SidebarNav>
            <SidebarItem
                icon="bi bi-house-door-fill"
                text="Dashboard"
                isActive={true}
                onClick={() => setActiveSection("Dashboard")}
            />
            <SidebarItem
                icon="bi bi-people-fill"
                text="Users"
                link="#users"
                isActive={false}
                onClick={()=>setActiveSection('Users')}
            />
            <SidebarItem
                icon="bi bi-box-seam-fill"
                text="Products"
                link="#products"
                isActive={false}
                onClick={()=>setActiveSection('Products')}

            />
            <SidebarItem
                icon="bi bi-receipt-cutoff"
                text="Orders"
                link="#orders"
                isActive={false}
                onClick={()=>setActiveSection('Orders')}

            />
            <SidebarItem
                icon="bi bi-gear-fill"
                text="Settings"
                link="#settings"
                isActive={false}
                onClick={()=>setActiveSection('Settings')}
            />
        </SidebarNav>
    );
}