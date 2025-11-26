import StatsPageCoordinator from "../StatsPage/StatsPageCoordinator.jsx";
import AlumniDataTable from "../AlumniData/AlumniDataTable.jsx";
import { useFetch } from "../../../hooks/useFetch.js";
import Loader from "../../Loader/Loader.jsx";
import PostsSection from "../PostsComponents/PostSection.jsx";
import { useUpdate } from "../../../hooks/useUpdate.js";
import { useDelete } from "../../../hooks/useDelete.js"
import PresidentManagement from "../DesendentComponent/PresidentsManagement.jsx";
import { usePost } from "../../../hooks/usePost.js";
export default function CoordinatorMain({ activeMenu }) {

    const Base_URL = import.meta.env.VITE_API_URL;

    const { loading: updating, error, put } = useUpdate(`${Base_URL}/user/update`);
    const { data, loading, refetch } = useFetch(`${Base_URL}/dashboard/coordinator`);
    const { loading: deleting, remove } = useDelete(`${Base_URL}/notification/del`);
    const { loading: deleteingUser, remove: removeUser } = useDelete(`${Base_URL}/user/delete`)
    const {loading:notifying,post} = usePost(`${Base_URL}/notification/create`)
    console.log("admin data from /dashboard/coordinator", data);

    if (loading || deleting || deleteingUser || updating || notifying) {
        return <Loader />;
    }

    return (

        <div className="container-fluid p-3 ">
            {
                activeMenu === "dashboard" && <StatsPageCoordinator data={data} onAccept={put} delNotify={remove} rejectFunc={removeUser} refetch={refetch} role="Coordinator" notify={post} />
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
                activeMenu==="president" &&  <PresidentManagement/>
            }

            {activeMenu === "posts" && <PostsSection />}

          
        </div>
    );


}       
