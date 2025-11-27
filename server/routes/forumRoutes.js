const express = require('express');
const {
    getAllProblems,
    getProblemById,
    createProblem,
    addCommentToProblem
} = require('../controllers/forumController');

const { verifyToken } = require("../middleware/verifyJWT");
const { verifyRoles } = require("../middleware/verifyRole");

const router = express.Router();

// Base path: /api

// Problems/Questions
router.get('/problems', verifyToken, getAllProblems);
router.post('/problems', verifyToken, createProblem);
router.get('/problems/:id', verifyToken, getProblemById);

// Comments/Replies (nested under the problem)
router.post('/problems/:id/comments', verifyToken, addCommentToProblem);

module.exports = router;
