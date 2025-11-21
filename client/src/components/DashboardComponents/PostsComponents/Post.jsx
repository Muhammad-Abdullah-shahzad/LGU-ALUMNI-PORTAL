// LinkedInPost.jsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // Bootstrap Icons

// Responsive PostWrapper
const PostWrapper = ({ children ,className}) => (
  <div
    className={`card mb-4 shadow-sm rounded-3 mx-auto ${className}`}

  >
    {children}
  </div>
);

// PostHeader: Author info
const PostHeader = ({ author, avatar, role, date }) => (
  <div className="d-flex align-items-center p-3">
    <img
      src={avatar}
      alt={author}
      className="rounded-circle me-3"
      style={{ width: "50px", height: "50px", objectFit: "cover" }}
    />
    <div>
      <strong>{author}</strong>
      {role && (
        <div className="text-muted" style={{ fontSize: "0.85rem" }}>
          {role}
        </div>
      )}
      <div className="text-muted" style={{ fontSize: "0.75rem" }}>
        {new Date(date).toLocaleString()}
      </div>
    </div>
  </div>
);

// PostBody: Text and image
const PostBody = ({ content, image }) => (
  <div className="p-3">
    <p className="mb-2">{content}</p>
    {image && (
      <div
        style={{
          width: "100%",
          height: "200px",
          overflow: "hidden",
          borderRadius: "0.5rem",
        }}
      >
        <img
          src={image}
          alt="post"
          className="w-100 h-100"
          style={{ objectFit: "cover" }}
        />
      </div>
    )}
  </div>
);

// PostActions: Bootstrap icons
const PostActions = ({ initialLikes = 0, initialComments = 0 }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [comments] = useState(initialComments);

  return (
    <div className="d-flex justify-content-between align-items-center px-3 pb-3 flex-wrap">
      <div className="d-flex gap-2 flex-wrap">
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() => setLikes(likes + 1)}
        >
          <i className="bi bi-hand-thumbs-up me-1"></i> Like {likes > 0 && likes}
        </button>
        <button className="btn btn-outline-secondary btn-sm">
          <i className="bi bi-chat-left-text me-1"></i> Comment {comments > 0 && comments}
        </button>
        <button className="btn btn-outline-success btn-sm">
          <i className="bi bi-share me-1"></i> Share
        </button>
      </div>
      <button className="btn btn-outline-dark btn-sm mt-2 mt-md-0">
        <i className="bi bi-bookmark"></i>
      </button>
    </div>
  );
};

// Full LinkedIn-style Post Component
export const LinkedInPost = ({ post }) => (
  <PostWrapper className='col-md-5'>
    <PostHeader
      author={post.author}
      avatar={post.avatar}
      role={post.role}
      date={post.date}
    />
    <PostBody content={post.content} image={post.image} />
    <PostActions initialLikes={post.likes} initialComments={post.comments} />
  </PostWrapper>
);

// Sample post object
export const sampleLinkedInPost = {
  id: "post_001",
  author: "Alice Johnson",
  avatar: "https://i.pravatar.cc/150?img=32",
  role: "Software Engineer at LGU",
  date: "2025-11-21T12:00:00Z",
  content:
    "Excited to share that I’ve completed the new alumni portal project! It allows seamless connections for all LGU graduates. 🚀",
  image: "https://startuppakistan.com.pk/wp-content/uploads/2024/03/images-2024-03-06T122533.924.jpeg",
  likes: 12,
  comments: 3,
};
