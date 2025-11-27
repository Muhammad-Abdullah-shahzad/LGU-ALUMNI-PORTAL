import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../../hooks/useFetch';
import { usePost } from '../../../hooks/usePost';

// Utility
const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

const ProblemDetail = () => {
    const { id } = useParams();
    const API_BASE_URL = `/forum/problems/${id}`;
    const COMMENT_URL = `/forum/problems/${id}/comments`;

    // Fetch Problem
    const {
        data: problem,
        loading: problemLoading,
        error: problemError,
        refetch: refetchProblem
    } = useFetch(`${import.meta.env.API_BASE_URL}${API_BASE_URL}`);

    // Post Comment
    const {
        postData: postComment,
        loading: commentSubmitting,
        error: commentError
    } = usePost(COMMENT_URL);

    const [commentContent, setCommentContent] = useState('');

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!commentContent.trim()) return;

        const newComment = { content: commentContent };

        try {
            await postComment(newComment);
            setCommentContent('');
            await refetchProblem();
        } catch {}
    };

    if (problemLoading)
        return (
            <div className="container mt-5">
                <p className="text-center">
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Loading problem...
                </p>
            </div>
        );

    if (problemError)
        return (
            <div className="container mt-5">
                <div className="alert alert-danger">Error loading problem: {problemError}</div>
            </div>
        );

    if (!problem)
        return (
            <div className="container mt-5">
                <div className="alert alert-warning">Problem not found.</div>
            </div>
        );

    return (
        <div className="container my-5">
            {/* Problem Details */}
            <div className="card shadow-lg mb-4 border-0">
                <div className="card-header bg-primary text-white">
                    <h1 className="mb-0 fs-4">{problem.title}</h1>
                </div>
                <div className="card-body">
                    <p className="lead text-dark">{problem.body}</p>

                    <footer className="blockquote-footer mt-3 pt-3 border-top">
                        Posted by <strong>{problem.author.name}</strong> on{' '}
                        {formatDate(problem.createdAt)}
                    </footer>

                    <div className="mt-3">
                        {problem.tags &&
                            problem.tags.map((tag, index) => (
                                <span key={index} className="badge rounded-pill bg-info me-2 p-2">
                                    {tag}
                                </span>
                            ))}
                    </div>
                </div>
            </div>

            {/* Replies */}
            <h3 className="mb-3 text-secondary">Replies ({problem.comments.length})</h3>

            {/* Comment Form */}
            <div className="card mb-4 shadow-sm">
                <div className="card-body">
                    <h5 className="mb-3">Post a Reply</h5>

                    {commentError && <div className="alert alert-danger">{commentError}</div>}

                    <form onSubmit={handleCommentSubmit}>
                        <div className="mb-3">
                            <textarea
                                className="form-control"
                                rows="3"
                                placeholder="Add your constructive reply here..."
                                value={commentContent}
                                onChange={(e) => setCommentContent(e.target.value)}
                                required
                                disabled={commentSubmitting}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-success"
                            disabled={commentSubmitting || !commentContent.trim()}
                        >
                            {commentSubmitting ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2"></span>
                                    Posting...
                                </>
                            ) : (
                                'Post Reply'
                            )}
                        </button>
                    </form>
                </div>
            </div>

            {/* Comments List */}
            <div className="comments-list">
                {problem.comments.length > 0 ? (
                    problem.comments.map((comment) => (
                        <div
                            key={comment._id}
                            className="card mb-3 border-start border-success border-5 shadow-sm"
                        >
                            <div className="card-body p-3">
                                <p className="mb-1">{comment.content}</p>
                                <footer className="blockquote-footer small mt-1">
                                    <strong>{comment.author.name}</strong> replied on{' '}
                                    {formatDate(comment.createdAt)}
                                </footer>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="alert alert-info text-center">
                        No replies yet. Be the first to assist!
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProblemDetail;
