const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Use absolute path so it always finds the file regardless of where node is run from
const LOCATION_FILE = path.join(__dirname, '..', 'locationinfo.json');

// ─── GET /searchlocation/:location ────────────────────────────────
router.get('/searchlocation/:location', (req, res) => {
    const l = req.params.location;

    fs.readFile(LOCATION_FILE, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Internal Server Error');

        let locations = {};
        try { locations = JSON.parse(data); } catch { return res.status(500).send('Database file corrupted'); }
        const result = locations[l];
        if (result) {
            res.send(result);
        } else {
            res.status(404).send('Location not found');
        }
    });
});

// ─── GET /biggercard ──────────────────────────────────────────────
router.get('/biggercard', (req, res) => {
    const { id, location } = req.query;

    fs.readFile(LOCATION_FILE, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Internal Server Error');

        let locations = {};
        try { locations = JSON.parse(data); } catch { return res.status(500).send('Database file corrupted'); }
        const result = locations[location];
        const ans = result && result.find(e => e.crecheid == id);

        if (ans) {
            res.send(ans);
        } else {
            res.status(404).send('Creche not found');
        }
    });
});

// ─── POST /registercreche ─────────────────────────────────────────
router.post('/registercreche', (req, res) => {
    const crecheInfo = req.body.data;
    const editing = req.body.editing;

    // Validate required fields
    if (!crecheInfo) {
        return res.status(400).send('No creche data received');
    }
    if (!crecheInfo.location || crecheInfo.location === '') {
        return res.status(400).send('Location is required');
    }
    if (!crecheInfo.name) {
        return res.status(400).send('Creche name is required');
    }

    fs.readFile(LOCATION_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading locationinfo.json:', err);
            return res.status(500).send('Could not read database file: ' + err.message);
        }

        let locations = {};
        try {
            locations = JSON.parse(data);
        } catch (parseErr) {
            console.error('Error parsing locationinfo.json:', parseErr);
            return res.status(500).send('Database file is corrupted');
        }

        // Make sure location key exists as an array
        if (!locations[crecheInfo.location]) {
            locations[crecheInfo.location] = [];
        }

        if (editing === true) {
            const index = locations[crecheInfo.location].findIndex(
                e => e.id == crecheInfo.id || e.crecheid == crecheInfo.crecheid
            );
            if (index !== -1) {
                locations[crecheInfo.location][index] = crecheInfo;
            } else {
                crecheInfo.crecheid = uuidv4();
                locations[crecheInfo.location].push(crecheInfo);
            }
        } else {
            crecheInfo.crecheid = uuidv4();
            locations[crecheInfo.location].push(crecheInfo);
        }

        fs.writeFile(LOCATION_FILE, JSON.stringify(locations, null, 2), (err) => {
            if (err) {
                console.error('Error writing locationinfo.json:', err);
                return res.status(500).send('Could not save to database: ' + err.message);
            }
            res.send('ok');
        });
    });
});

// ─── GET /registercreche ──────────────────────────────────────────
router.get('/registercreche', (req, res) => {
    const { location, id } = req.query;

    fs.readFile(LOCATION_FILE, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Internal Server Error');

        let locations = {};
        try { locations = JSON.parse(data); } catch { return res.status(500).send('Database file corrupted'); }
        const locationData = locations[location];
        if (!locationData) return res.status(404).send('Location not found');

        const result = locationData.find(item => item.userid == id);
        if (result) {
            res.send(result);
        } else {
            res.status(404).send('Creche not found');
        }
    });
});

module.exports = router;