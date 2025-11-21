import StatsPage from "../StatsPage/StatsPage.jsx";
import CoordinatorsManagement from "../DesendentComponent/CoordinatorsManagement.jsx";
import AlumniDataTable from "../AlumniData/AlumniDataTable.jsx";
import { useFetch } from "../../../hooks/useFetch.js";
import Loader from "../../Loader/Loader.jsx";
import {LinkedInPost as Post, sampleLinkedInPost as samplePost} from "../PostsComponents/Post.jsx";
import DashboardHeader from "../DashboardHeader/DashboardHeader.jsx"

export default function Main({ activeMenu }) {

  const Base_URL = import.meta.env.VITE_API_URL;

  const { data, loading } = useFetch(`${Base_URL}/dashboard/admin`);

  console.log("admin data from /dashboard/admin", data);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container-fluid p-3">
      {
        activeMenu === "dashboard" && <StatsPage data={data} />
      }
      {
        activeMenu === "alumniData" && <AlumniDataTable data={[
          {
            "id": 1,
            "name": "Ali Raza",
            "batch": "Fall 2020",
            "degree": "BS Software Engineering",
            "rollno": "F20-SE-001",
            "employmentStatus": "employed",
            "companyName": "TechGen",
            "jobTitle": "Frontend Developer",
            "graduationYear": 2024
          },
          {
            "id": 2,
            "name": "Fatima Zahra",
            "batch": "Spring 2019",
            "degree": "BS Computer Science",
            "rollno": "S19-CS-014",
            "employmentStatus": "unemployed",
            "companyName": "-",
            "jobTitle": "-",
            "graduationYear": 2023
          },
          {
            "id": 3,
            "name": "Hamza Khan",
            "batch": "Fall 2018",
            "degree": "BS IT",
            "rollno": "F18-IT-022",
            "employmentStatus": "employed",
            "companyName": "Systems Limited",
            "jobTitle": "Network Engineer",
            "graduationYear": 2022
          },
          {
            "id": 4,
            "name": "Sara Malik",
            "batch": "Spring 2021",
            "degree": "BS Software Engineering",
            "rollno": "S21-SE-006",
            "employmentStatus": "employed",
            "companyName": "Contour Software",
            "jobTitle": "UI/UX Designer",
            "graduationYear": 2025
          },
          {
            "id": 5,
            "name": "Usman Javed",
            "batch": "Fall 2020",
            "degree": "BS Computer Science",
            "rollno": "F20-CS-039",
            "employmentStatus": "unemployed",
            "companyName": "-",
            "jobTitle": "-",
            "graduationYear": 2024
          }
        ]
        } />
      }
      {
        activeMenu === "coordinators" && <CoordinatorsManagement />
      }
      {
        activeMenu === "posts" && <div className="row">
<Post post={samplePost} />
<Post post={samplePost} />

        </div> 
      }
      {
        activeMenu === "notifications" && <div>notifications Data Section</div>
      }
    </div>
  );


}       
