import SidebarItem from "../SideBarItem/SideBarItem";
import SidebarNav from "../SidebarNav/SidebarNav";
import AuthorName from "../AuthorName/AuthorName";
import React, {  useState } from "react";
import adminContext from '../../context/context';

export default function AdminSideBar({setActiveMenu}) {

  
    return (
        <SidebarNav>
            <AuthorName>Admin Dashboard</AuthorName>
            <SidebarItem
                icon="bi bi-house-door-fill"
                text="Dashboard"
                isActive={true}
                onClick={() => setActiveMenu("dashboard")}
            />
            <SidebarItem
                icon="bi bi-people-fill"
                text="Alumni Data"
                link="#users"
                isActive={false}
                onClick={()=>setActiveMenu('alumniData')}
            />
            <SidebarItem
                icon="bi bi-box-seam-fill"
                text="Coordinators"

                isActive={false}
                onClick={()=>setActiveMenu('coordinators')}

            />
            <SidebarItem
                icon="bi bi-file-post"
                text="Posts"

                isActive={false}
                onClick={()=>setActiveMenu('posts')}

            />
            <SidebarItem
                icon="bi bi-bell-fill"
                text="Notifications"
           
                isActive={false}
                onClick={()=>setActiveMenu('notifications')}
            />
        </SidebarNav>
    );
}