const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const LOCATION_FILE = path.join(__dirname, '..', 'locationinfo.json');

// ─── GET /ownerbookings ───────────────────────────────────────────
router.get('/ownerbookings', (req, res) => {
    const { location, userid } = req.query;

    fs.readFile(LOCATION_FILE, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Internal Server Error');

        let locations = {};
        try { locations = JSON.parse(data || '{}'); } catch { return res.status(500).send('Database file corrupted'); }
        const locationData = locations[location];
        if (!locationData) return res.status(404).send('Location not found');

        const creche = locationData.find(c => c.userid == userid || c.id == userid);
        if (!creche) return res.status(404).send('Creche not found');

        res.send({ creche, bookings: creche.bookings || [] });
    });
});

module.exports = router;