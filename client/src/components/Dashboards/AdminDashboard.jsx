import Main from '../DashboardComponents/Main/Main';
import AdminSideBar from '../DashboardComponents/SideBar/AdminSideBar';
import DashboardLayout from '../DashboardComponents/DashboardLayout/DashboardLayout';
export default function AdminDashboard() {
    return (
       <DashboardLayout>
          <AdminSideBar />
           <Main /  >
        </DashboardLayout>
    );
}