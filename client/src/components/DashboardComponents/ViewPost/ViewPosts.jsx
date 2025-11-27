import Post from "../PostsComponents/Post";
import { useDelete } from "../../../hooks/useDelete"
import Loader from "../../Loader/Loader";
export default function ViewPosts({ posts = [] ,refetchPost , readMode}) {
     const Base_Url = import.meta.env.VITE_API_URL;
    const { remove: delPost, loading: deleting } = useDelete(`${Base_Url}/post/del`);
    if (deleting) return <Loader />
    return (
        <div
            className="row g-4 justify-content-center"
            style={{ marginTop: "10px" }}
        >
            {posts.map((post) => {
                const created = new Date(post.createdAt);
                const now = new Date();
                const diffMs = now - created;
                const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

                return (
                    <div
                        key={post._id}
                        className="col-12 col-md-6 col-lg-4 d-flex"
                    >
                        <Post
                            {...post}
                            readMode={readMode}
                            onDelPost={async()=>
                                {
                               await delPost({postId:post._id});
                                await refetchPost();
                      
                            }}
             
                            timeAgo={`${diffHours} hours ago`}
                            className="w-100 h-100"
                        />
                    </div>
                );
            })}
        </div>
    );
}
