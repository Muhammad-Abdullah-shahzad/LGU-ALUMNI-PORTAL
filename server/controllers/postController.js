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
            postStatus: req.user.role === "coordinator"? "approved": "pending"
        });
        res.status(201).json({ message: 'Post created successfully' });

    }
    catch (error) {
        res.status(500).json({ message: 'failed to create post', error });
    }
}


