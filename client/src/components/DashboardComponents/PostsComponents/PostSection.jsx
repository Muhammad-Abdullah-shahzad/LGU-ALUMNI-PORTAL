import RowWrapper from "../CardsWrapper/CardsWrapper"
import Post from "./Post"

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

export default function PostsSection() {
    return (
        <>
            <RowWrapper>
                <Post {...postDetails} 
            
                />
               <Post 
  {...postDetails} 
  
  headerImageUrl="https://erpnews.com/v2/wp-content/uploads/2022/09/Corporate-Event-1.webp" 
/>
            </RowWrapper>
        </>
    )
}