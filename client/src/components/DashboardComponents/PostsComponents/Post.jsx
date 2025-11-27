import React from "react";

const Post = ({
    authorName,
    authorTitle,
    timeAgo,
    headerImageURL,
    authorAvatarUrl,
    postTitle,
    postContent,
    postLink = "#",
    onDelPost,
    _id,
    readMode,
    className,

}) => {
    return (
        <div
            className={`card shadow-sm border-0 rounded-4 overflow-hidden ${className}`}
            style={{
                minHeight: "100%",
                display: "flex",
                flexDirection: "column"
            }}
        >
            {/* Render image only if it exists */}
            {headerImageURL && (
                <img
                    src={headerImageURL}
                    alt="header"
                    className="w-100"
                    style={{
                        height: "220px",
                        objectFit: "cover",
                        objectPosition: "center",
                    }}
                    loading="lazy"
                />
            )}

            {/* Body becomes a flexible area */}
            <div
                className="card-body pb-3"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1
                }}
            >
                {/* Author Section */}
                <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="d-flex align-items-center">
                        <img
                            src={authorAvatarUrl || "../src/assets/postprofile.png"}
                            className="rounded-circle me-3"
                            alt={authorName}
                            style={{
                                width: "50px",
                                height: "50px",
                                objectFit: "cover"
                            }}
                        />
                        <div>
                            <h6 className="mb-0 fw-semibold">{authorName}</h6>
                            <p className="text-muted small mb-0">{authorTitle}</p>
                        </div>
                    </div>
                    <small className="text-muted">{timeAgo}</small>
                </div>

                {/* Title */}
                <h5 className="fw-bold mb-2">{postTitle}</h5>

                {/* Content */}
                <p className="text-muted mb-3" style={{ fontSize: "0.95rem" }}>
                    {postContent}
                </p>

                {/* This pushes the button to bottom always */}
                <div className="mt-auto text-end d-flex gap-1">
                    {readMode || <a
                        onClick={onDelPost}
                        className="btn btn-sm btn-outline-danger rounded-pill px-3 "
                    >
                        Delete Post
                    </a>}
                    <a
                        href={postLink}
                        className="btn btn-sm btn-outline-success rounded-pill px-3"
                    >
                        View Post →
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Post;
