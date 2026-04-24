const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const LOCATION_FILE = path.join(__dirname, '..', 'locationinfo.json');

// ─── POST /updatereviews ──────────────────────────────────────────
router.post('/updatereviews', (req, res) => {
    const { username, newreviews, location, crecheName } = req.body;

    fs.readFile(LOCATION_FILE, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Internal Server Error');

        const Data = JSON.parse(data || '{}');
        const locationToChange = Data[location];

        if (!locationToChange) return res.status(404).send('Location not found');

        locationToChange.forEach(e => {
            if (e.name === crecheName) {
                e.reviews = newreviews;
            }
        });

        fs.writeFile(LOCATION_FILE, JSON.stringify(Data, null, 2), (err) => {
            if (err) return res.status(500).send('Internal Server Error');
            res.send({ status: 'success' });
        });
    });
});

module.exports = router;