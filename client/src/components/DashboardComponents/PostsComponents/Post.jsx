import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

// --- INSTAGRAM STYLE MODAL ---
const InstagramStyleModal = ({
    postData,
    onClose,
    currentUser
}) => {
    const {
        _id,
        authorName,
        authorTitle,
        authorAvatarUrl,
        headerImageURL,
        postTitle,
        postContent,
        timeAgo
    } = postData;

    const Base_Url = import.meta.env.VITE_API_URL;

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [loadingComments, setLoadingComments] = useState(false);

    // Reply State
    const [activeReplyId, setActiveReplyId] = useState(null);
    const [replyContent, setReplyContent] = useState("");

    // Fetch Comments on Mount
    useEffect(() => {
        fetchComments();
    }, [_id]);

    const fetchComments = async () => {
        try {
            setLoadingComments(true);
            const response = await fetch(`${Base_Url}/comment/${_id}`);
            const data = await response.json();
            setComments(data);
        } catch (error) {
            console.error("Error fetching comments:", error);
        } finally {
            setLoadingComments(false);
        }
    };

    const handleAddComment = async () => {
        if (!newComment.trim()) return;

        try {
            const response = await fetch(`${Base_Url}/comment/add`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    postId: _id,
                    authorId: currentUser.id || currentUser._id,
                    content: newComment,
                    authorName: `${currentUser.firstName} ${currentUser.lastName}`,
                    authorAvatar: currentUser.profileImage || "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
                }),
            });
            const data = await response.json();
            if (response.ok) {
                setComments([data.comment, ...comments]);
                setNewComment("");
            }
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    const handleAddReply = async (commentId) => {
        if (!replyContent.trim()) return;

        try {
            const response = await fetch(`${Base_Url}/comment/reply/${commentId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    authorId: currentUser.id || currentUser._id,
                    authorName: `${currentUser.firstName} ${currentUser.lastName}`,
                    authorAvatar: currentUser.profileImage || "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg",
                    content: replyContent
                }),
            });
            const data = await response.json();
            if (response.ok) {
                const updatedComments = comments.map(c =>
                    c._id === commentId ? data.comment : c
                );
                setComments(updatedComments);
                setReplyContent("");
                setActiveReplyId(null);
            }
        } catch (error) {
            console.error("Error adding reply:", error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        if (!confirm("Are you sure you want to delete this comment?")) return;

        try {
            const response = await fetch(`${Base_Url}/comment/${commentId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setComments(comments.filter(c => c._id !== commentId));
            } else {
                console.error("Failed to delete comment");
            }
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    /* 
       DESIGN NOTE: 
       We use a fixed backdrop with z-index 1050 (Bootstrap modal level).
       The Modal content is responsive:
       - Desktop: Row layout (Image 55%, Content 45%)
       - Mobile/No-Image: Column layout (Content 100%)
    */

    return ReactDOM.createPortal(
        <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{
                backgroundColor: "rgba(0,0,0,0.6)",
                zIndex: 1050,
                backdropFilter: "blur(5px)"
            }}
            onClick={onClose}
        >
            <div
                className="bg-white rounded-4 overflow-hidden shadow-lg d-flex flex-column flex-lg-row"
                style={{
                    width: "90%",
                    maxWidth: "1100px",
                    height: "85vh",
                    maxHeight: "800px"
                }}
                onClick={e => e.stopPropagation()}
            >
                {/* LEFT SIDE: Image (Desktop only if image exists) */}
                {headerImageURL && (
                    <div
                        className="d-none d-lg-flex bg-black align-items-center justify-content-center"
                        style={{ width: "55%", height: "100%", backgroundColor: "#000" }}
                    >
                        <img
                            src={headerImageURL}
                            alt="Post"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    </div>
                )}

                {/* RIGHT SIDE: Interactions (Full width if no image or mobile) */}
                <div
                    className="d-flex flex-column"
                    style={{
                        // On mobile (flex-column), this takes full width automatically if no width is set.
                        // On desktop (flex-row), 'flex: 1' takes the remaining space after the image's 55%.
                        flex: 1,
                        height: "100%",
                        minWidth: 0 // Prevent flex overflow issues
                    }}
                >
                    {/* Header */}
                    <div className="p-3 border-bottom d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                            <img
                                src={authorAvatarUrl || "../src/assets/postprofile.png"}
                                className="rounded-circle me-3"
                                alt={authorName}
                                style={{ width: "40px", height: "40px", objectFit: "cover" }}
                            />
                            <div>
                                <h6 className="mb-0 fw-bold">{authorName}</h6>
                                <p className="text-muted small mb-0">{authorTitle}</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="btn btn-close"></button>
                    </div>

                    {/* Scrollable Area: Caption + Comments */}
                    <div className="flex-grow-1 overflow-auto p-3" style={{ scrollbarWidth: "thin" }}>
                        {/* Post Caption as first item */}
                        <div className="d-flex mb-4">
                            <img
                                src={authorAvatarUrl || "../src/assets/postprofile.png"}
                                className="rounded-circle me-3"
                                alt="Author"
                                style={{ width: "35px", height: "35px", objectFit: "cover" }}
                            />
                            <div>
                                <h6 className="mb-1 fw-bold fs-6">{authorName}</h6>
                                <p className="small mb-1">{postContent}</p>
                                <small className="text-muted" style={{ fontSize: "0.75rem" }}>{timeAgo}</small>
                            </div>
                        </div>

                        {/* Comments List */}
                        {loadingComments ? (
                            <div className="text-center py-4 text-muted">Loading comments...</div>
                        ) : (
                            comments.map(comment => (
                                <div key={comment._id} className="d-flex mb-3">
                                    <Link to={`/profile/${comment.authorId}`}>
                                        <img
                                            src={comment.authorProfileImage || "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"}
                                            alt={comment.authorName}
                                            className="rounded-circle me-3"
                                            style={{ width: "35px", height: "35px", objectFit: "cover" }}
                                        />
                                    </Link>
                                    <div className="w-100">
                                        <div className="d-flex align-items-baseline gap-2">
                                            <Link to={`/profile/${comment.authorId}`} className="text-dark text-decoration-none fw-bold small">
                                                {comment.authorName}
                                            </Link>
                                            <span className="text-muted small">
                                                {comment.commentContent}
                                            </span>
                                        </div>

                                        {/* Actions Line */}
                                        <div className="d-flex gap-3 mt-1 align-items-center">
                                            <small className="text-muted" style={{ fontSize: "0.7rem" }}>
                                                {new Date(comment.createdAt).toLocaleDateString()}
                                            </small>
                                            <button
                                                className="btn btn-link p-0 text-decoration-none text-muted small"
                                                style={{ fontSize: "0.75rem" }}
                                                onClick={() => {
                                                    setActiveReplyId(activeReplyId === comment._id ? null : comment._id);
                                                    setReplyContent("");
                                                }}
                                            >
                                                Reply
                                            </button>

                                            {/* Delete Button for Author */}
                                            {(currentUser.id === comment.authorId || currentUser._id === comment.authorId) && (
                                                <button
                                                    className="btn btn-link p-0 text-decoration-none text-danger small"
                                                    style={{ fontSize: "0.75rem" }}
                                                    onClick={() => handleDeleteComment(comment._id)}
                                                >
                                                    Delete
                                                </button>
                                            )}
                                        </div>

                                        {/* Reply Input */}
                                        {activeReplyId === comment._id && (
                                            <div className="mt-2 d-flex gap-2">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm"
                                                    placeholder="Reply..."
                                                    value={replyContent}
                                                    onChange={(e) => setReplyContent(e.target.value)}
                                                    onKeyDown={(e) => e.key === 'Enter' && handleAddReply(comment._id)}
                                                    autoFocus
                                                />
                                                <button className="btn btn-sm btn-primary py-0" onClick={() => handleAddReply(comment._id)}>Post</button>
                                            </div>
                                        )}

                                        {/* Nested Replies */}
                                        {comment.replies && comment.replies.length > 0 && (
                                            <div className="mt-2 ps-3 border-start">
                                                {comment.replies.map((reply, i) => (
                                                    <div key={i} className="d-flex mb-2">
                                                        <Link to={`/profile/${reply.authorId}`}>
                                                            <img
                                                                src={reply.authorProfileImage || "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"}
                                                                alt={reply.authorName}
                                                                className="rounded-circle me-2"
                                                                style={{ width: "25px", height: "25px", objectFit: "cover" }}
                                                            />
                                                        </Link>
                                                        <div>
                                                            <div className="d-flex align-items-baseline gap-2">
                                                                <Link to={`/profile/${reply.authorId}`} className="text-dark text-decoration-none fw-bold small">
                                                                    {reply.authorName}
                                                                </Link>
                                                                <span className="text-muted small">{reply.content}</span>
                                                            </div>
                                                            <small className="text-muted" style={{ fontSize: "0.7rem" }}>
                                                                {new Date(reply.createdAt).toLocaleDateString()}
                                                            </small>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer: Add Comment */}
                    <div className="p-3 border-top bg-light">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control border-0 bg-white shadow-sm"
                                placeholder="Add a comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                            />
                            <button
                                className="btn btn-white text-primary fw-bold shadow-sm"
                                disabled={!newComment.trim()}
                                onClick={handleAddComment}
                            >
                                <i className="bi bi-send-fill"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};


// --- MAIN POST COMPONENT ---
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
    const [showModal, setShowModal] = useState(false);

    // Check if user object exists safely
    let user = {};
    try {
        user = JSON.parse(localStorage.getItem("user")) || {};
    } catch (e) {
        console.error("Error parsing user", e);
    }

    // Prepare post data object to pass to modal
    const postData = {
        _id,
        authorName,
        authorTitle,
        timeAgo,
        headerImageURL,
        authorAvatarUrl,
        postTitle,
        postContent
    };

    return (
        <>
            <div
                className={`card shadow-sm border-0 rounded-4 overflow-hidden ${className}`}
                style={{
                    minHeight: "100%",
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                {/* Header Image */}
                {headerImageURL && (
                    <div
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowModal(true)}
                    >
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
                    </div>
                )}

                {/* Body */}
                <div
                    className="card-body pb-3"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        flexGrow: 1
                    }}
                >
                    {/* Author */}
                    <div className="d-flex align-items-center justify-content-between mb-3">
                        <div className="d-flex align-items-center">
                            <img
                                src={authorAvatarUrl || "../src/assets/postprofile.png"}
                                className="rounded-circle me-3"
                                alt={authorName}
                                style={{ width: "50px", height: "50px", objectFit: "cover" }}
                            />
                            <div>
                                <h6 className="mb-0 fw-semibold">{authorName}</h6>
                                <p className="text-muted small mb-0">{authorTitle}</p>
                            </div>
                        </div>
                        <small className="text-muted">{timeAgo}</small>
                    </div>

                    {/* Content */}
                    <h5 className="fw-bold mb-2">{postTitle}</h5>
                    <p className="text-muted mb-3" style={{ fontSize: "0.95rem" }}>
                        {postContent}
                    </p>

                    {/* Actions */}
                    <div className="mt-auto text-center d-flex justify-content-between w-100 px-2">
                        {readMode || <a
                            onClick={onDelPost}
                            className="btn btn-outline-danger rounded-pill px-2 py-1 mx-1 d-flex align-items-center justify-content-center"
                            style={{ fontSize: "0.75rem", flex: 1 }}
                        >
                            Delete
                        </a>}
                        <button
                            className="btn btn-outline-primary rounded-pill px-2 py-1 mx-1 d-flex align-items-center justify-content-center gap-1"
                            onClick={() => setShowModal(true)}
                            style={{ fontSize: "0.75rem", flex: 1 }}
                        >
                            <i className="bi bi-chat"></i>
                            Comment
                        </button>
                        <a
                            href={postLink}
                            className="btn btn-outline-success rounded-pill px-2 py-1 mx-1 d-flex align-items-center justify-content-center"
                            style={{ fontSize: "0.75rem", flex: 1 }}
                        >
                            View
                        </a>
                    </div>
                </div>
            </div>

            {/* Render Modal */}
            {showModal && (
                <InstagramStyleModal
                    postData={postData}
                    currentUser={user}
                    onClose={() => setShowModal(false)}
                />
            )}
        </>
    );
};

export default Post;
