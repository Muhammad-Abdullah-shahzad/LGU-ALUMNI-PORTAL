import React from 'react';

// A generic card component designed to display a social media-style post or event notice.
const Post = ({ 
    authorName, 
    authorTitle, 
    timeAgo, 
    headerImageUrl, 
    authorAvatarUrl, 
    postTitle, 
    postContent,
    postLink = '#',
    className
}) => {
    return (
        <div className={`card shadow-sm ${className}`} >
            {/* 1. Header Image/Visual Section */}
            <div 
                className="card-img-top bg-dark rounded-top mt-2" 
                style={{ 
                    backgroundImage: `url(${headerImageUrl})`, 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center', 
                    backgroundRepeat:"no-repeat",
                    minHeight: '220px' 
                }}
            >
                {/* Placeholder for the visual content */}
            </div>

            {/* 2. Card Body Content */}
            <div className="card-body">
                {/* Author Info and Timestamp Row */}
                <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="d-flex align-items-center">
                        {/* Author Profile Picture */}
                        <img 
                            src={authorAvatarUrl} 
                            className="rounded-circle me-3" 
                            alt={authorName} 
                            style={{ width: '48px', height: '48px', objectFit: 'cover' }}
                        />
                        <div>
                            {/* Author Name */}
                            <h6 className="mb-0"><strong>{authorName}</strong></h6>
                            {/* Author Title/Role */}
                            <p className="card-text text-muted small">{authorTitle}</p>
                        </div>
                    </div>
                    {/* Timestamp */}
                    <small className="text-muted">{timeAgo}</small>
                </div>

                {/* Post Title */}
                <h5 className="card-title fw-bold mt-2">{postTitle}</h5>

                {/* Post Content/Description */}
                <p className="card-text">
                    {postContent}
                </p>

                {/* View Post Link */}
                <div className="text-end">
                    <a href={postLink} className="btn btn-link p-0 text-decoration-none">View Post &rarr;</a>
                </div>
            </div>
        </div>
    );
};

export default Post;