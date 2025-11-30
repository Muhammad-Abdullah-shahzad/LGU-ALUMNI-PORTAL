
import ProfileSection from "../Profile/Profile.jsx";
import PostsSection from "../PostsComponents/PostSection.jsx";
import AlumniForum from "../Forum/Forum.jsx";

export default function PresidentMain({ activeMenu }) {

    return (
        <div className="container-fluid p-3 ">
            {activeMenu === "posts" && <PostsSection />}
            {activeMenu === "forum" && <AlumniForum />}
            {activeMenu === "profile" && <ProfileSection />}
        </div>
    );

}       
