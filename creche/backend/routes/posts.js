const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const verifyToken = require('../middleware/verifyToken');

const POSTS_FILE = path.join(__dirname, '..', 'posts.json');

// ─── GET /posts (public) ──────────────────────────────────────────
router.get('/posts', (req, res) => {
    fs.readFile(POSTS_FILE, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Internal Server Error');
        let posts = [];
        try { posts = JSON.parse(data || '[]'); } catch { return res.status(500).send('Database file corrupted'); }
        res.send(posts.slice().reverse());
    });
});

// ─── POST /posts (protected) ──────────────────────────────────────
router.post('/posts', verifyToken, (req, res) => {
    const { title, description, location, healthStatus, category, imageUrl, postedBy } = req.body;
    if (!title || !postedBy) return res.status(400).send('Title and postedBy are required');

    fs.readFile(POSTS_FILE, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Internal Server Error');

        let posts = [];
        try { posts = JSON.parse(data || '[]'); } catch { return res.status(500).send('Database file corrupted'); }
        // Generate unique ID — never reuse existing ones
        let newId = uuidv4();
        while (posts.find(p => p.id === newId)) {
            newId = uuidv4();
        }

        const newPost = {
            id: newId,
            title,
            description: description || '',
            location: location || '',
            healthStatus: healthStatus || '',
            category: category || 'stray',
            imageUrl: imageUrl || '',
            postedBy,
            createdAt: new Date().toISOString(),
            comments: [],
        };
        posts.push(newPost);

        fs.writeFile(POSTS_FILE, JSON.stringify(posts, null, 2), (err) => {
            if (err) return res.status(500).send('Internal Server Error');
            res.status(201).send(newPost);
        });
    });
});

// ─── POST /posts/:id/comment (protected) ─────────────────────────
router.post('/posts/:id/comment', verifyToken, (req, res) => {
    const { id } = req.params;
    const { commentText, postedBy } = req.body;
    if (!commentText || !postedBy) return res.status(400).send('commentText and postedBy are required');

    fs.readFile(POSTS_FILE, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Internal Server Error');

        let posts = [];
        try { posts = JSON.parse(data || '[]'); } catch { return res.status(500).send('Database file corrupted'); }
        const post = posts.find(p => p.id === id);
        if (!post) return res.status(404).send('Post not found');

        const comment = {
            id: uuidv4(),
            commentText,
            postedBy,
            createdAt: new Date().toISOString(),
        };
        post.comments.push(comment);

        fs.writeFile(POSTS_FILE, JSON.stringify(posts, null, 2), (err) => {
            if (err) return res.status(500).send('Internal Server Error');
            res.status(201).send(comment);
        });
    });
});

module.exports = router;