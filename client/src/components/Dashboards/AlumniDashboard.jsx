import AlumniMain from '../DashboardComponents/Main/AlumniMain';
import AlumniSideBar from '../DashboardComponents/SideBar/AlumniSide';
import DashboardLayout from '../DashboardComponents/DashboardLayout/DashboardLayout';
import { useState } from 'react';

export default function AlumniDashboard() {
    const [activeMenu, setActiveMenu] = useState("posts");
    return (
        <DashboardLayout>
            <AlumniSideBar setActiveMenu={setActiveMenu} />
            <AlumniMain activeMenu={activeMenu} />
        </DashboardLayout>
    );
}