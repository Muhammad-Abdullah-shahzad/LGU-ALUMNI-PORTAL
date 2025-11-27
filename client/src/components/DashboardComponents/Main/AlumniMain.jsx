


import PostsSection from "../PostsComponents/PostSection.jsx";
import AlumniForum from "../Forum/Forum.jsx";
export default function AlumniMain({ activeMenu }) {

    return (
        <div className="container-fluid p-3 ">
            {activeMenu === "posts" && <PostsSection readMode={true} />}
            {activeMenu === "forum" && <AlumniForum/>}
        </div>
    );


}       
