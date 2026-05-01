const express = require('express');
const router = express.Router();
const Creche = require('../models/Creche');

// ─── GET /ownerbookings ───────────────────────────────────────────
router.get('/ownerbookings', async (req, res) => {
    const { location, userid } = req.query;

    try {
        const creche = await Creche.findOne({
            userid: userid,
            location: location
        });

        if (!creche) return res.status(404).send('Creche not found');

        res.send({ creche, bookings: creche.bookings || [] });

    } catch (err) {
        console.error('Owner bookings error:', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;