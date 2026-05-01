const express = require('express');
const router = express.Router();
const Creche = require('../models/Creche');

// ─── GET /searchlocation/:location ────────────────────────────────
router.get('/searchlocation/:location', async (req, res) => {
    try {
        const creches = await Creche.find({ location: req.params.location });
        if (!creches || creches.length === 0) {
            return res.status(404).send('No creches found in this location');
        }
        res.send(creches);
    } catch (err) {
        console.error('Search error:', err);
        res.status(500).send('Internal Server Error');
    }
});

// ─── GET /biggercard ──────────────────────────────────────────────
router.get('/biggercard', async (req, res) => {
    const { id, location } = req.query;
    try {
        const creche = await Creche.findOne({ crecheid: id, location: location });
        if (!creche) return res.status(404).send('Creche not found');
        res.send(creche);
    } catch (err) {
        console.error('Biggercard error:', err);
        res.status(500).send('Internal Server Error');
    }
});

// ─── POST /registercreche ─────────────────────────────────────────
router.post('/registercreche', async (req, res) => {
    const crecheData = req.body.data;
    const editing = req.body.editing;

    try {
        if (editing === true) {
            // Update existing creche
            await Creche.findOneAndUpdate(
                { userid: crecheData.userid },
                crecheData,
                { new: true }
            );
            res.send("ok");
        } else {
            // Create new creche with unique ID
            const { v4: uuidv4 } = require('uuid');
            crecheData.crecheid = uuidv4();
            await Creche.create(crecheData);
            res.send("ok");
        }
    } catch (err) {
        console.error('Register creche error:', err);
        res.status(500).send('Internal Server Error');
    }
});

// ─── GET /registercreche ──────────────────────────────────────────
router.get('/registercreche', async (req, res) => {
    const { location, id } = req.query;
    try {
        const creche = await Creche.findOne({ userid: id, location: location });
        if (!creche) return res.status(404).send('Creche not found');
        res.send(creche);
    } catch (err) {
        console.error('Get registercreche error:', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;