const postController = require('../controllers/postController');
const express = require('express');
const { verifyToken } = require('../middleware/verifyJWT');
const { verifyRoles } = require('../middleware/verifyRole')
const router = express.Router();

router.post('/create', verifyToken, verifyRoles('coordinator', 'president'), postController.createPost);

router.delete('/del', verifyToken, verifyRoles('coordinator', 'president'), postController.deletePost);

router.get('/all', verifyToken, postController.getAllPosts);

router.get('/:postId', verifyToken,  postController.getPostById);

module.exports = router;