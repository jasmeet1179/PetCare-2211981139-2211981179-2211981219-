const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('../config/cloudinary');

const storage = multer.memoryStorage();
const upload = multer({ storage });

// ─── POST /upload ─────────────────────────────────────────────────
router.post('/upload', upload.single('image'), async (req, res) => {
    if (!req.file) return res.status(400).send('No file uploaded.');

    try {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const dataURI = `data:${req.file.mimetype};base64,${b64}`;
        const result = await cloudinary.v2.uploader.upload(dataURI, { resource_type: 'auto' });
        return res.status(201).json({ url: result.secure_url, public_id: result.public_id });
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;