import CoordinatorMain from '../DashboardComponents/Main/CoordinatorMain';
import CoordinatorSideBar from '../DashboardComponents/SideBar/CoordinatorSideBar';
import DashboardLayout from '../DashboardComponents/DashboardLayout/DashboardLayout';
import { useState } from 'react';
import CoordinatorContext from '../context/coordinatorContext';

export default function CoordinatorDashboard() {

    const [activeMenu, setActiveMenu] = useState("dashboard");

    return (
        <CoordinatorContext.Provider value={{ activeMenu, setActiveMenu }}>
            <DashboardLayout>
                <CoordinatorSideBar setActiveMenu={setActiveMenu} />
                <CoordinatorMain activeMenu={activeMenu} />
            </DashboardLayout>
        </CoordinatorContext.Provider>
    );


}