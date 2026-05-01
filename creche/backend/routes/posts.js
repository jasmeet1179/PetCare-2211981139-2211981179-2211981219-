const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const verifyToken = require('../middleware/verifyToken');

// ─── GET /posts (public) ──────────────────────────────────────────
router.get('/posts', async (req, res) => {
    try {
        // Sort by newest first
        const posts = await Post.find().sort({ createdAt: -1 });
        res.send(posts);
    } catch (err) {
        console.error('Get posts error:', err);
        res.status(500).send('Internal Server Error');
    }
});

// ─── POST /posts (protected) ──────────────────────────────────────
router.post('/posts', verifyToken, async (req, res) => {
    const { title, description, location, healthStatus, category, imageUrl, postedBy } = req.body;

    if (!title || !postedBy) {
        return res.status(400).send('Title and postedBy are required');
    }

    try {
        const newPost = await Post.create({
            title,
            description: description || '',
            location: location || '',
            healthStatus: healthStatus || '',
            category: category || 'stray',
            imageUrl: imageUrl || '',
            postedBy,
        });

        res.status(201).send(newPost);

    } catch (err) {
        console.error('Create post error:', err);
        res.status(500).send('Internal Server Error');
    }
});

// ─── POST /posts/:id/comment (protected) ─────────────────────────
router.post('/posts/:id/comment', verifyToken, async (req, res) => {
    const { commentText, postedBy } = req.body;

    if (!commentText || !postedBy) {
        return res.status(400).send('commentText and postedBy are required');
    }

    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).send('Post not found');

        // Push comment into post
        post.comments.push({ commentText, postedBy });
        await post.save();

        // Send back the newly added comment
        const newComment = post.comments[post.comments.length - 1];
        res.status(201).send(newComment);

    } catch (err) {
        console.error('Add comment error:', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;