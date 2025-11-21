import Post from "../PostsComponents/Post"
export default function ViewPosts({ posts = [] }) {
    return (
        <>
            {posts.map((post) => {
                const created = new Date(post.createdAt);
                const now = new Date();
                const diffMs = now - created;           // difference in milliseconds
                const diffHours = Math.floor(diffMs / 1000 / 60 / 60); // convert to hours
                let time = diffHours + 'Hours Ago'
                return <Post {...post} timeAgo={time} />
            })
            }
        </>
    )
}