import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { usePost } from "../../../hooks/usePost";
import { useFetch } from "../../../hooks/useFetch";

// --- UTILITY ---
const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

// --- PROBLEM ITEM COMPONENT ---
const ProblemItem = ({ problem, addCommentToProblem, userDisplayName }) => {
  const API_BASE = import.meta.env.VITE_API_URL || "";
  const { post: postComment, error: postError } = usePost(
    `${API_BASE}/forum/problems/${problem._id}/comments`
  );

  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setLoading(true);

    if (typeof addCommentToProblem !== "function") {
      console.error("addCommentToProblem not provided!");
      setLoading(false);
      return;
    }

    try {
      const result = await postComment({ content: comment });
      const newComment = {
        _id: result.commentId,
        content: comment,
        author: { name: userDisplayName || "Alumni User" },
        createdAt: new Date(),
      };
      addCommentToProblem(problem._id, newComment);
      setComment("");
    } catch (err) {
      console.error("Comment post failed:", err);
    }
    setLoading(false);
  };

  return (
    <div className="card mb-4  shadow-sm">
      <div className="card-body">
        <h5 className="card-title text-dark">{problem.title}</h5>
        <p className="card-text">{problem.body}</p>

        {problem.tags?.length > 0 && (
          <p className="mb-2">
            {problem.tags.map((t, i) => (
              <span
                key={i}
                className="badge rounded-pill bg-secondary text-light me-2"
              >
                {t}
              </span>
            ))}
          </p>
        )}
        <p className="text-muted small border-top pt-2">
          Posted by <strong>{problem.author.name}</strong> on{" "}
          {formatDate(problem.createdAt)}
        </p>

        <h6 className="mt-3 mb-2">
          Replies ({problem.comments?.length || 0})
        </h6>

        <div className="comments-list border-top pt-2 mb-3">
          {problem.comments?.length > 0 ? (
            problem.comments.map((c) => (
              <div
                key={c._id}
                className="p-2 my-1 border rounded bg-light small"
              >
                <strong>{c.author.name}:</strong> {c.content}
              </div>
            ))
          ) : (
            <p className="text-muted small">No replies yet.</p>
          )}
        </div>

        {postError && (
          <div className="alert alert-danger p-2 small">{postError}</div>
        )}
        <form onSubmit={handleAddComment} className="mt-2">
          <div className="input-group">
            <input
              type="text"
              className="form-control border"
              placeholder={`Add a reply as ${userDisplayName || "Alumni User"}...`}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              disabled={loading}
              required
              style={{ boxShadow: "none" }}
            />
            <button
              className="btn btn-success"
              type="submit"
              disabled={loading || !comment.trim()}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm"></span>
              ) : (
                "Reply"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- PROBLEM MODAL ---
const ProblemModal = ({
  onClose,
  postData,
  loading,
  error,
  addProblem,
  userDisplayName,
}) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tagsInput, setTagsInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tagsArray = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const newProblem = { title, body, tags: tagsArray };

    try {
      const result = await postData(newProblem);
      const postedProblem = {
        ...result,
        author: result.author || { name: userDisplayName || "Alumni User" },
        comments: [],
        commentCount: 0,
      };
      addProblem(postedProblem);
      onClose();
    } catch (err) {
      console.error("Post problem failed:", err);
    }
  };

  return ReactDOM.createPortal(
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={loading ? undefined : onClose}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        role="document"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Ask a New Question</h5>
            <button
              type="button"
              className="btn-close"
              onClick={loading ? undefined : onClose}
              disabled={loading}
            ></button>
          </div>
          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control border"
                  placeholder="Enter a brief title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  disabled={loading}
                  style={{ boxShadow: "none" }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Details</label>
                <textarea
                  className="form-control border"
                  rows="5"
                  placeholder="Describe your problem"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  required
                  disabled={loading}
                  style={{ boxShadow: "none" }}
                ></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label">Tags (optional)</label>
                <input
                  type="text"
                  className="form-control border"
                  placeholder="e.g., career, software"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  disabled={loading}
                  style={{ boxShadow: "none" }}
                />
              </div>

              <button
                type="submit"
                className="btn btn-success w-100"
                disabled={loading || !title || !body}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    ></span>
                    Posting...
                  </>
                ) : (
                  "Post Question"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root") || document.body
  );
};

// --- MAIN FORUM COMPONENT ---
const Forum = () => {
  const [showModal, setShowModal] = useState(false);
  const API_BASE = import.meta.env.VITE_API_URL || "";
  const API_URL = `${API_BASE}/forum/problems`;

  const userDisplayName =
    JSON.parse(localStorage.user).firstName +
    " " +
    JSON.parse(localStorage.user).lastName;

  const [problems, setProblems] = useState([]);
  const { data: fetchedProblems, loading: fetchLoading, error: fetchError } =
    useFetch(API_URL);

  useEffect(() => {
    if (Array.isArray(fetchedProblems)) {
      setProblems(fetchedProblems);
    }
  }, [fetchedProblems]);

  const { post: postData, loading: postLoading, error: postError } =
    usePost(API_URL);

  const addProblem = (problem) => {
    setProblems((prev) => [problem, ...prev]);
  };

  const addCommentToProblem = (problemId, comment) => {
    setProblems((prev) =>
      prev.map((p) =>
        p._id === problemId
          ? {
              ...p,
              comments: [...(p.comments || []), comment],
              commentCount: (p.comments?.length || 0) + 1,
            }
          : p
      )
    );
  };

  return (
    <div className="container my-5">
      <header className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
        <h2 className="text-dark">Alumni Problem Forum</h2>
        <button className="btn btn-success" onClick={() => setShowModal(true)}>
          + Ask a Question
        </button>
      </header>

      {(fetchLoading || postLoading) && (
        <p className="text-center">
          <span className="spinner-border spinner-border-sm me-2"></span> Loading
          data...
        </p>
      )}
      {fetchError && (
        <div className="alert alert-danger" role="alert">
          Error fetching problems: {fetchError}
        </div>
      )}

      <div className="problems-list">
        {problems.length > 0 ? (
          problems.map((p) => (
            <ProblemItem
              key={p._id}
              problem={p}
              addCommentToProblem={addCommentToProblem}
              userDisplayName={userDisplayName}
            />
          ))
        ) : (
          !fetchLoading && (
            <div className="alert alert-info text-center">
              No problems posted yet.
            </div>
          )
        )}
      </div>

      {showModal && (
        <ProblemModal
          onClose={() => setShowModal(false)}
          postData={postData}
          loading={postLoading}
          error={postError}
          addProblem={addProblem}
          userDisplayName={userDisplayName}
        />
      )}
    </div>
  );
};

export default Forum;
