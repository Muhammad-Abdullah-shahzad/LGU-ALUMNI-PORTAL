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
    const { loading: notifying, post } = usePost(`${Base_URL}/notification/create`)
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
                activeMenu === "alumniData" && <AlumniDataTable />
            }
            {
                activeMenu === "president" && <PresidentManagement />
            }

            {activeMenu === "posts" && <PostsSection />}
    


        </div>
    );


}       
