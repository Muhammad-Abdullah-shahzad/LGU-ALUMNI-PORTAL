const postModel = require("../models/postModel")

exports.createPost = async (req, res) => {
    try {
        const { authorId, header, likes, commentCount, content, createdAt, postStatus } = req.body;
        await notificationModel.create({
            authorId,
            header,
            likes: 0,
            commentCount: 0,
            content,
            createdAt,
            postStatus: req.user.role === "coordinator" ? "approved" : "pending"
        });
        res.status(201).json({ message: 'Post created successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'failed to create post', error });
    }
}
exports.deletePost = async (req, res) => {
    try {
        const { postId } = req.params;
        await postModel.findByIdAndDelete(postId);
        res.status(200).json({ message: 'Post deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'failed to delete post', error });
    }
}



exports.getAllPosts = async (req, res) => {
    try {
        const posts = await postModel.find();
        res.status(200).json(posts);
    }
    catch (error) {

        res.status(500).json({ message: 'failed to get posts', error });
    }
}

exports.getPostById = async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await postModel.findById(postId); 
        res.status(200).json(post);
    }
    catch (error) {
        res.status(500).json({ message: 'failed to get post', error });
    }
}
