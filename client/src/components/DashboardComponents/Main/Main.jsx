import StatsPage from "../StatsPage/StatsPage.jsx";
import adminContext from "../../context/context.js";

import { useFetch } from "../../../hooks/useFetch.js";
import Loader from "../../Loader/Loader.jsx";
export default function Main({activeMenu}) {
    const Base_URL = `http://localhost:5000`;


    const { data, loading, error, refetch: fetchData } = useFetch(`${Base_URL}/dashboard/admin`);
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
                activeMenu === "alumniData" && <div>Alumni Data Section</div>
            }
            {
                activeMenu === "coordinators" && <div>coordinators Data Section</div>
            }
            {
                activeMenu === "posts" && <div>posts Data Section</div>
            }
            {
                activeMenu === "notifications" && <div>notifications Data Section</div>
            }
        </div>
    );


}       
