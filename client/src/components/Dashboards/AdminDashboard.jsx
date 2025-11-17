import React from 'react';
import AdminSideBar from '../SideBar/AdminSideBar';
 import DashboardLayout from '../DashboardLayout/DashboardLayout';
export default function AdminDashboard() {
    return (
       <DashboardLayout>
          <AdminSideBar />
            <div>
                <h1>Admin Dashboard</h1>
                <p>Welcome to the admin dashboard. Here you can manage users, products, orders, and settings.</p>
            </div>
        </DashboardLayout>
    );
}