const express = require('express');
const router = express.Router();
const Comment = require('../schema/commentSchema');
const Post = require('../schema/postSchema');

// Add a comment
router.post('/add', async (req, res) => {
    try {
        const { postId, authorId, content, authorName, authorAvatar } = req.body;

        const newComment = new Comment({
            postId,
            authorId,
            authorName,
            authorProfileImage: authorAvatar,
            commentContent: content,
        });

        await newComment.save();

        // Optional: Update comment count on post
        await Post.findByIdAndUpdate(postId, { $inc: { commentCount: 1 } });

        res.status(201).json({ message: "Comment added successfully", comment: newComment });
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ message: "Error adding comment", error });
    }
});

// Get comments for a post
router.get('/:postId', async (req, res) => {
    try {
        const { postId } = req.params;
        const comments = await Comment.find({ postId }).sort({ createdAt: -1 }); // Newest first
        res.status(200).json(comments);
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ message: "Error fetching comments", error });
    }
});

// Add a reply to a comment
router.post('/reply/:commentId', async (req, res) => {
    try {
        const { commentId } = req.params;
        const { authorId, authorName, authorAvatar, content } = req.body;

        const updatedComment = await Comment.findByIdAndUpdate(
            commentId,
            {
                $push: {
                    replies: {
                        authorId,
                        authorName,
                        authorProfileImage: authorAvatar,
                        content,
                        createdAt: new Date()
                    }
                }
            },
            { new: true } // Return the updated document
        );

        res.status(200).json({ message: "Reply added successfully", comment: updatedComment });
    } catch (error) {
        console.error("Error adding reply:", error);
        res.status(500).json({ message: "Error adding reply", error });
    }
});

module.exports = router;
