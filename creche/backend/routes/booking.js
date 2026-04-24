const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const verifyToken = require('../middleware/verifyToken');

const LOCATION_FILE = path.join(__dirname, '..', 'locationinfo.json');
const USERS_FILE = path.join(__dirname, '..', 'users.json');

// ─── POST /booking (protected) ────────────────────────────────────
router.post('/booking', verifyToken, (req, res) => {
    const crecheInfo = req.body.crecheInfo;
    const bookingDetails = req.body.bookingDetails;
    const userInfo = req.body.userInfo.User;

    const l = crecheInfo.location;
    const now = new Date();
    const time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    const date = now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();

    fs.readFile(LOCATION_FILE, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Internal Server Error');

        let Data = JSON.parse(data || '{}');
        const creche = Data[l] && Data[l].find(item => item.crecheid == crecheInfo.id || item.id == crecheInfo.id);

        if (!creche) return res.status(404).send('Creche not found');

        if (!creche.bookings) creche.bookings = [];
        creche.bookings.push(bookingDetails);

        const crecheName = creche.name || '';
        const crecheprice = creche.price || 0;

        fs.writeFile(LOCATION_FILE, JSON.stringify(Data, null, 2), (err) => {
            if (err) return res.status(500).send('Internal Server Error');

            fs.readFile(USERS_FILE, 'utf8', (err, userdata) => {
                if (err) return res.status(500).send('Internal Server Error');

                const users = JSON.parse(userdata);
                const user = users[userInfo.userName];
                if (!user) return res.status(404).send('User not found');

                const booking = {
                    date,
                    time,
                    location: crecheInfo.location,
                    crecheName,
                    price: crecheprice,
                    id: crecheInfo.id,
                };

                if (!user.bookingHistory) user.bookingHistory = [];
                if (!user.currentBooking) user.currentBooking = [];

                user.bookingHistory.push(booking);
                user.currentBooking.push(booking);

                fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), (err) => {
                    if (err) return res.status(500).send('Internal Server Error');
                    res.send("ok");
                });
            });
        });
    });
});

// ─── POST /cancelbooking (protected) ─────────────────────────────
router.post('/cancelbooking', verifyToken, (req, res) => {
    const { userName, bookingIndex } = req.body;

    fs.readFile(USERS_FILE, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Internal Server Error');

        let users = {};
        try { users = JSON.parse(data || '{}'); } catch { return res.status(500).send('Database file corrupted'); }
        const user = users[userName];
        if (!user) return res.status(404).send('User not found');

        if (!user.currentBooking || bookingIndex === undefined) {
            return res.status(400).send('Invalid request');
        }

        user.currentBooking.splice(bookingIndex, 1);

        fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), (err) => {
            if (err) return res.status(500).send('Internal Server Error');
            res.send({ status: 'cancelled' });
        });
    });
});

module.exports = router;