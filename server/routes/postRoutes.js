const postController = require('../controllers/postController');
const express = require('express');
const router = express.Router();

router.post('/create', postController.createPost);

router.delete('/:postId', postController.deletePost);

router.get('/all', postController.getAllPosts);

router.get('/:postId', postController.getPostById);

module.exports = router;