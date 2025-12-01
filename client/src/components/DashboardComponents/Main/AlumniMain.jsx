
import ProfileSection from "../Profile/Profile.jsx";
import AlumniMainDash from "./AlumniMainDash.jsx";
import AlumniForum from "../Forum/Forum.jsx";
export default function AlumniMain({ activeMenu }) {

    return (
        <div className="container-fluid p-3 ">
            {activeMenu === "posts" && <AlumniMainDash/>}
            {activeMenu === "forum" && <AlumniForum/>}
            {activeMenu === "profile" && <ProfileSection/>}
        </div>
    );
}       
