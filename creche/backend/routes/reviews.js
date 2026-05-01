const express = require('express');
const router = express.Router();
const Creche = require('../models/Creche');

// ─── POST /updatereviews ──────────────────────────────────────────
router.post('/updatereviews', async (req, res) => {
    const { username, newreviews, location, crecheName } = req.body;

    try {
        const creche = await Creche.findOneAndUpdate(
            { name: crecheName, location: location },
            { reviews: newreviews },
            { new: true }
        );

        if (!creche) return res.status(404).send('Creche not found');

        res.send({ status: 'success' });

    } catch (err) {
        console.error('Update reviews error:', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;