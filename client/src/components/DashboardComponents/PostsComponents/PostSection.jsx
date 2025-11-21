import RowWrapper from "../CardsWrapper/CardsWrapper"
import Post from "./Post"
import Loader from "../../Loader/Loader"
const postDetails = {
    authorName: 'Abdullah',
    authorTitle: 'SE President',
    timeAgo: '2 hours ago',
    headerImageUrl: 'https://i.pinimg.com/736x/d6/a6/92/d6a692fc1e0489955e2b4ed4ae742c76.jpg', // Use a placeholder for demonstration
    authorAvatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlOLBRK-3wEFFeCojWlHou4nooggl5iI2PJQ&s', // Use a placeholder for demonstration
    postTitle: 'Upcoming Tech Talk: AI in Modern Software Development',
    postContent: "Join us this Friday for an exciting session on how AI is transforming the software engineering landscape. We'll have guest speakers from leading tech companies.",
    postLink: '/read-more-about-ai-talk'
}
import ViewPosts from "../ViewPost/ViewPosts"
import { useFetch } from "../../../hooks/useFetch"
import AddPost from "../AddPost/AddPost"
import { usePost } from "../../../hooks/usePost";
export default function PostsSection() {

    const Base_Url = import.meta.env.VITE_API_URL;
    const { loading: postLoading, data: posts, refetch, error: postError } = useFetch(`${Base_Url}/post/all`);
    const { loading, error, post } = usePost(`${Base_Url}/post/create`);
    if(postLoading || loading) return <Loader/>
    return (
        <>
            <AddPost title='Add Posts' postReq={post} refetch={refetch} />
            <ViewPosts posts={posts}/>
        </>
    )
}