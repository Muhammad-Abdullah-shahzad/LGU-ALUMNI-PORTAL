import StatsPage from "../StatsPage/StatsPage.jsx";
import CoordinatorsManagement from "../DesendentComponent/CoordinatorsManagement.jsx";
import AlumniDataTable from "../AlumniData/AlumniDataTable.jsx";
import { useFetch } from "../../../hooks/useFetch.js";
import Loader from "../../Loader/Loader.jsx";
import PostsSection from "../PostsComponents/PostSection.jsx"
import DashboardHeader from "../DashboardHeader/DashboardHeader.jsx"

export default function Main({ activeMenu }) {

  const Base_URL = import.meta.env.VITE_API_URL;

  const { data, loading } = useFetch(`${Base_URL}/dashboard/admin`);

  console.log("admin data from /dashboard/admin", data);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container-fluid p-3 ">
      {
        activeMenu === "dashboard" && <StatsPage data={data} role="Admin" />
      }
      {
        activeMenu === "alumniData" && <AlumniDataTable data={data} />
      }
      {
        activeMenu === "coordinators" && <CoordinatorsManagement />
      }
      {
        activeMenu === "posts" && <PostsSection/>
      }
   
    </div>
  );


}       
