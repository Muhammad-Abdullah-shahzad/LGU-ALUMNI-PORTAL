import PresidentMain from '../DashboardComponents/Main/PresidentMain';
import PresidentSideBar from '../DashboardComponents/SideBar/PresidentSideBar';
import DashboardLayout from '../DashboardComponents/DashboardLayout/DashboardLayout';
import { useState } from 'react';

export default function PresidentDashboard() {
    const [activeMenu, setActiveMenu] = useState("posts");
    return (
        <DashboardLayout>
            <PresidentSideBar setActiveMenu={setActiveMenu} />
            <PresidentMain activeMenu={activeMenu} />
        </DashboardLayout>
    );
}