import Main from '../DashboardComponents/Main/Main';
import AdminSideBar from '../DashboardComponents/SideBar/AdminSideBar';
import DashboardLayout from '../DashboardComponents/DashboardLayout/DashboardLayout';
import { useState } from 'react';
import adminContext from '../context/context';
export default function AdminDashboard() {
   
    const [activeMenu, setActiveMenu] = useState("dashboard");

    return (
        <adminContext.Provider value={{ activeMenu, setActiveMenu }}>
            <DashboardLayout>
                <AdminSideBar setActiveMenu={setActiveMenu} />
                <Main activeMenu={activeMenu} />
            </DashboardLayout>
        </adminContext.Provider>
    );
}