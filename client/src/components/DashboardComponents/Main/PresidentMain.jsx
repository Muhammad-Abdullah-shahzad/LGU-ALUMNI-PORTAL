
import ProfileSection from "../Profile/Profile.jsx";
import PresidentMainDash from "./PresidentMainDash.jsx";
import AlumniForum from "../Forum/Forum.jsx";

export default function PresidentMain({ activeMenu }) {

    return (
        <div className="container-fluid p-3 ">
            {activeMenu === "posts" && <PresidentMainDash />}
            {activeMenu === "forum" && <AlumniForum />}
            {activeMenu === "profile" && <ProfileSection />}
        </div>
    );

}       
