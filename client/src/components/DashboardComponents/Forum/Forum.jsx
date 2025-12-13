import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { usePost } from "../../../hooks/usePost";
import { useFetch } from "../../../hooks/useFetch";

// --- UTILITY ---
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

// --- FORUM OVERLAY MODAL ---
const ForumOverlayModal = ({
  problem,
  onClose,
  userDisplayName,
  userId,
  initialComments
}) => {
  const API_BASE = import.meta.env.VITE_API_URL || "";

  // We already have initial comments passed down, but we might want to refresh them
  // or just use local state management similar to Post modal.
  const [comments, setComments] = useState(initialComments || []);
  const [newComment, setNewComment] = useState("");

  // Reply State
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [replyContent, setReplyContent] = useState("");

  // We can reuse the usePost hook logic or fetch directly
  const { post: postComment } = usePost(`${API_BASE}/forum/problems/${problem._id}/comments`);

  // In a real app, you might want to re-fetch comments on mount to ensure freshness
  // useEffect(() => { ...fetch... }, []);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const result = await postComment({ content: newComment });
      // Construct optimistic comment object
      const addedComment = {
        _id: result.commentId,
        content: newComment,
        author: {
          id: userId,
          name: userDisplayName
        },
        createdAt: new Date(),
        replies: []
      };

      setComments([...comments, addedComment]);
      setNewComment("");
    } catch (err) {
      console.error("Comment post failed:", err);
    }
  };

  const handleAddReply = async (commentId) => {
    if (!replyContent.trim()) return;

    try {
      const response = await fetch(`${API_BASE}/forum/problems/${problem._id}/comments/${commentId}/reply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ content: replyContent })
      });
      const data = await response.json();

      if (response.ok) {
        const updatedComments = comments.map(c =>
          c._id === commentId ? { ...c, replies: [...(c.replies || []), data.reply] } : c
        );
        setComments(updatedComments);
        setReplyContent("");
        setActiveReplyId(null);
      }
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

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
        {/* LEFT SIDE: Problem Details (Desktop) */}
        <div
          className="d-none d-lg-flex flex-column border-end bg-light p-4"
          style={{ width: "50%", height: "100%", overflowY: "auto" }}
        >
          <div className="d-flex align-items-center mb-4">
            <img
              src={"https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"}
              className="rounded-circle me-3"
              alt={problem.author.name}
              style={{ width: "50px", height: "50px", objectFit: "cover" }}
            />
            <div>
              <h6 className="mb-0 fw-bold">{problem.author.name}</h6>
              <small className="text-muted">{formatDate(problem.createdAt)}</small>
            </div>
          </div>

          <h4 className="fw-bold mb-3">{problem.title}</h4>
          <p className="text-muted" style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}>
            {problem.body}
          </p>

          <div className="mt-4">
            {problem.tags?.map((t, i) => (
              <span key={i} className="badge rounded-pill bg-white text-dark border me-1 mb-1">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE: Discussions */}
        <div
          className="d-flex flex-column"
          style={{
            flex: 1, // Takes remaining 50% on desktop, 100% on mobile
            height: "100%",
            minWidth: 0
          }}
        >
          {/* Header (Mobile Only) */}
          <div className="d-lg-none p-3 border-bottom d-flex align-items-center justify-content-between">
            <h6 className="mb-0 fw-bold text-truncate" style={{ maxWidth: "80%" }}>{problem.title}</h6>
            <button onClick={onClose} className="btn btn-close"></button>
          </div>
          {/* Desktop Close Button Header */}
          <div className="d-none d-lg-flex p-3 border-bottom justify-content-between align-items-center">
            <h6 className="mb-0 fw-bold">Discussion</h6>
            <button onClick={onClose} className="btn btn-close"></button>
          </div>

          {/* Scrollable Comments */}
          <div className="flex-grow-1 overflow-auto p-3" style={{ scrollbarWidth: "thin" }}>
            {/* Mobile: Show Body snippet */}
            <div className="d-lg-none mb-3 pb-3 border-bottom">
              <p className="small text-muted mb-2 line-clamp-3">{problem.body}</p>
            </div>

            {comments.length > 0 ? (
              comments.map((c) => (
                <div key={c._id} className="mb-3 bg-light p-3 rounded border-0">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={"https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"}
                        alt="User"
                        className="rounded-circle"
                        style={{ width: "30px", height: "30px" }}
                      />
                      <strong>{c.author.name}</strong>
                      <span className="text-muted small"> • {formatDate(c.createdAt)}</span>
                    </div>
                  </div>
                  <p className="mb-1 mt-2 small">{c.content}</p>

                  {/* Reply Toggle */}
                  <button
                    className="btn btn-link p-0 text-decoration-none small text-muted"
                    style={{ fontSize: "0.8rem" }}
                    onClick={() => {
                      setActiveReplyId(activeReplyId === c._id ? null : c._id);
                      setReplyContent("");
                    }}
                  >
                    Reply
                  </button>

                  {/* Reply Input */}
                  {activeReplyId === c._id && (
                    <div className="mt-2 ms-4 d-flex gap-2">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Reply..."
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddReply(c._id)}
                        autoFocus
                      />
                      <button
                        className="btn btn-success btn-sm py-0"
                        style={{ fontSize: "0.75rem" }}
                        onClick={() => handleAddReply(c._id)}
                      >
                        Reply
                      </button>
                    </div>
                  )}

                  {/* Nested Replies */}
                  {c.replies && c.replies.length > 0 && (
                    <div className="mt-2 ps-3 border-start ms-2">
                      {c.replies.map((reply, idx) => (
                        <div key={idx} className="mb-2 bg-white p-2 rounded border-0">
                          <div className="d-flex align-items-center gap-2 mb-1">
                            <strong className="small">{reply.author.name}</strong>
                            <span className="text-muted extra-small" style={{ fontSize: "0.7rem" }}>
                              {formatDate(reply.createdAt)}
                            </span>
                          </div>
                          <p className="mb-0 small text-muted">{reply.content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-5 text-muted">
                <i className="bi bi-chat-dots fs-1 d-block mb-2"></i>
                <p>No answers yet. Start the discussion!</p>
              </div>
            )}
          </div>

          {/* Footer: Input */}
          <div className="p-3 border-top bg-light">
            <div className="input-group">
              <input
                type="text"
                className="form-control border-0 bg-white shadow-sm"
                placeholder="Write an answer..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
              />
              <button
                className="btn btn-white text-success fw-bold shadow-sm"
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


// --- FORUM POST CARD (Triggers Modal) ---
const ForumPost = ({ problem, userDisplayName, userProfileImage, userId }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const commentCount = problem.comments ? problem.comments.length : 0;

  return (
    <>
      <div className="card shadow-sm border-0 rounded-4 mb-4 overflow-hidden">
        <div className="card-body">
          {/* Header: Author & Time */}
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div className="d-flex align-items-center">
              <img
                src={"https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"}
                className="rounded-circle me-3"
                alt={problem.author.name}
                style={{ width: "45px", height: "45px", objectFit: "cover" }}
              />
              <div>
                <h6 className="mb-0 fw-bold">{problem.author.name}</h6>
                <small className="text-muted">{formatDate(problem.createdAt)}</small>
              </div>
            </div>
            {/* Tags */}
            <div>
              {problem.tags?.map((t, i) => (
                <span key={i} className="badge rounded-pill bg-light text-dark border me-1">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Content */}
          <h5 className="fw-bold mb-2">{problem.title}</h5>
          <p className="text-muted mb-3 line-clamp-3" style={{ fontSize: "0.95rem", whiteSpace: "pre-wrap", display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {problem.body}
          </p>

          {/* Actions */}
          <div className="border-top pt-2 d-flex justify-content-between align-items-center">
            <button
              className="btn btn-sm btn-outline-success rounded-pill px-3 d-flex align-items-center gap-2"
              onClick={() => setShowOverlay(true)}
            >
              <i className="bi bi-chat-dots"></i>
              Discuss / Answer
            </button>
            <small className="text-muted">
              {commentCount} {commentCount === 1 ? "Answer" : "Answers"}
            </small>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {showOverlay && (
        <ForumOverlayModal
          problem={problem}
          userDisplayName={userDisplayName}
          userId={userId}
          initialComments={problem.comments}
          onClose={() => setShowOverlay(false)}
        />
      )}
    </>
  );
};

// --- PROBLEM MODAL ---
const ProblemModal = ({ onClose, onSuccess, userDisplayName }) => {
  const API_BASE = import.meta.env.VITE_API_URL || "";
  const { post, loading, error } = usePost(`${API_BASE}/forum/problems`);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tagsInput, setTagsInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tags = tagsInput.split(",").map(t => t.trim()).filter(Boolean);

    try {
      const result = await post({ title, body, tags });
      const newProblem = {
        ...result,
        author: result.author || { name: userDisplayName },
        comments: [],
        createdAt: new Date().toISOString()
      };
      onSuccess(newProblem);
      onClose();
    } catch (err) {
      console.error("Failed to post problem:", err);
    }
  };

  return ReactDOM.createPortal(
    <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content shadow">
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fw-bold">Ask a Question</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Title</label>
                <input
                  type="text"
                  className="form-control bg-light border-0 py-2"
                  placeholder="e.g., How to handle heavy traffic in Node.js?"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Description</label>
                <textarea
                  className="form-control bg-light border-0"
                  rows="6"
                  placeholder="Describe your problem in detail..."
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="form-label fw-semibold">Tags (comma separated)</label>
                <input
                  type="text"
                  className="form-control bg-light border-0 py-2"
                  placeholder="e.g., nodejs, scale, database"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                />
              </div>
              <div className="d-flex justify-content-end gap-2">
                <button type="button" className="btn btn-light" onClick={onClose}>Cancel</button>
                <button type="submit" className="btn btn-success px-4" disabled={loading}>
                  {loading ? "Posting..." : "Post Question"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

// --- MAIN FORUM COMPONENT ---
const Forum = () => {
  const [showModal, setShowModal] = useState(false);
  const API_BASE = import.meta.env.VITE_API_URL || "";
  const { data: fetchedProblems, loading, error } = useFetch(`${API_BASE}/forum/problems`);
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    if (Array.isArray(fetchedProblems)) {
      setProblems(fetchedProblems);
    }
  }, [fetchedProblems]);

  // Get user info safely
  let user = {};
  try {
    user = JSON.parse(localStorage.getItem("user")) || {};
  } catch (e) {
    console.error("Error parsing user from local storage", e);
  }
  const userDisplayName = `${user.firstName || "Alumni"} ${user.lastName || "User"}`;
  const userId = user.id || user._id;

  const handleNewProblem = (problem) => {
    setProblems([problem, ...problems]);
  };

  return (
    <div className="container" style={{ maxWidth: "800px" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center my-4">
        <div>
          <h2 className="fw-bold mb-1">Community Forum</h2>
          <p className="text-muted mb-0">Ask questions, share knowledge, and help others.</p>
        </div>
        <button className="btn btn-success rounded-pill px-4 shadow-sm" onClick={() => setShowModal(true)}>
          <i className="bi bi-plus-lg me-2"></i> Ask Question
        </button>
      </div>

      {/* Error/Loading */}
      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Problems List */}
      <div className="d-flex flex-column gap-3">
        {problems.map((problem) => (
          <ForumPost
            key={problem._id}
            problem={problem}
            userDisplayName={userDisplayName}
            userId={userId}
          />
        ))}
        {!loading && problems.length === 0 && (
          <div className="text-center py-5 text-muted border rounded-4 bg-light">
            <h5>No discussions yet</h5>
            <p>Be the first to start a conversation!</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <ProblemModal
          onClose={() => setShowModal(false)}
          onSuccess={handleNewProblem}
          userDisplayName={userDisplayName}
        />
      )}
    </div>
  );
};

export default Forum;
