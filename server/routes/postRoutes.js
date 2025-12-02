const postController = require('../controllers/postController');
const express = require('express');
const { verifyToken } = require('../middleware/verifyJWT');
const router = express.Router();

router.post('/create', verifyToken,postController.createPost);

router.delete('/del',verifyToken, postController.deletePost);

router.get('/all',verifyToken, postController.getAllPosts);

router.get('/:postId', verifyToken,postController.getPostById);

module.exports = router;