const postController = require('../controllers/postController');
const express = require('express');
const { verifyToken } = require('../middleware/verifyJWT');
const router = express.Router();

router.post('/create', verifyToken,postController.createPost);

router.delete('/del', postController.deletePost);

router.get('/all', postController.getAllPosts);

router.get('/:postId', postController.getPostById);

module.exports = router;