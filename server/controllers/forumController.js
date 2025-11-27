const { Question } = require('../schema/ForumSchema');

const getAuthUser = (req) => ({
    authorId: req.user?.id || null,
    authorName: req.user?.firstName + ' ' + req.user?.lastName || 'Alumni User'
});

// --- QUESTION/PROBLEM HANDLERS (CRUD) ---

// GET /api/problems - Get list of all questions/problems
const getAllProblems = async (req, res) => {
    try {
        const questions = await Question.find()
            .select('title author createdAt tags comments')
            .sort({ createdAt: -1 })
            .lean();

        const questionsWithCounts = questions.map(q => ({
            ...q,
            commentCount: q.comments.length
        }));

        res.status(200).json(questionsWithCounts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching problems." });
    }
};

// GET /api/problems/:id - Get a single problem and all its comments/replies
const getProblemById = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id).lean();

        if (!question) return res.status(404).json({ message: "Problem not found." });

        question.comments.sort((a, b) => a.createdAt - b.createdAt);

        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ message: "Error fetching problem details." });
    }
};

// POST /api/problems - Create a new problem/question
const createProblem = async (req, res) => {
    const { title, body, tags } = req.body;
    const { authorId, authorName } = getAuthUser(req);

    try {
        const newQuestion = new Question({
            title,
            body,
            tags,
            author: { id: authorId, name: authorName }
        });

        await newQuestion.save();
        res.status(201).json(newQuestion);
    } catch (error) {
        res.status(400).json({ message: "Invalid problem data." });
    }
};

// --- COMMENT/REPLY HANDLERS ---

// POST /api/problems/:id/comments - Add a comment/reply to the problem
const addCommentToProblem = async (req, res) => {
    const { content } = req.body;
    const { authorId, authorName } = getAuthUser(req);

    const newComment = {
        content,
        author: { id: authorId, name: authorName },
        createdAt: new Date()
    };

    try {
        const question = await Question.findByIdAndUpdate(
            req.params.id,
            { $push: { comments: newComment } },
            { new: true }
        );

        if (!question) return res.status(404).json({ message: "Problem not found." });

        const commentId = question.comments[question.comments.length - 1]._id;

        res.status(201).json({ message: "Reply added successfully.", commentId });
    } catch (error) {
        res.status(400).json({ message: "Error adding reply." });
    }
};

module.exports = {
    getAllProblems,
    getProblemById,
    createProblem,
    addCommentToProblem
};
