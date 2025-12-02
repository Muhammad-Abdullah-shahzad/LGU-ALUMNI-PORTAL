import React from "react";
import PostsSection from "../PostsComponents/PostSection.jsx";
import DashboardHeader from "../DashboardHeader/DashboardHeader.jsx";
import { useNavigate } from "react-router-dom";
import StatsPage from "../StatsPage/StatsPage.jsx";

export default function AlumniMainDash() {
    const navigate = useNavigate();
    return (
        <div className="container-fluid">
            <DashboardHeader title={"Alumni"} onLogout={() => {
            
                localStorage.removeItem("token");
                navigate('/login')
                console.log("on logout Run");
            
            }}/>
            <PostsSection readMode={true} />
        </div>
    );
}