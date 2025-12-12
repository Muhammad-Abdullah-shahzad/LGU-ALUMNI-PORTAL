import mongoose from 'mongoose';

// --- SUB-SCHEMA: Comment (Now serves as the primary reply mechanism) ---
const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        trim: true,
        maxlength: 1000 // Increased max length since comments are now replies
    },
    author: {
        id: { type: mongoose.Schema.Types.ObjectId, required: true },
        name: { type: String, required: true }
    },
    replies: [{
        content: { type: String, required: true },
        author: {
            id: { type: mongoose.Schema.Types.ObjectId, required: true },
            name: { type: String, required: true }
        },
        createdAt: { type: Date, default: Date.now }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    // We explicitly set timestamps to false here since we added a 'createdAt' field,
    // but the main document (Question) will still use timestamps.
    timestamps: false,
    _id: true
});


// --- QUESTION/PROBLEM SCHEMA (Main Collection) ---
const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200
    },
    body: {
        type: String,
        required: true
    },
    author: {
        id: { type: mongoose.Schema.Types.ObjectId, required: true },
        name: { type: String, required: true }
    },
    tags: [{
        type: String,
        trim: true
    }],
    // All responses are now embedded as comments
    comments: [commentSchema]
}, {
    timestamps: true // Adds createdAt and updatedAt for the main question
});


export const Question = mongoose.model('Question', questionSchema);
// Note: We no longer need an Answer model.