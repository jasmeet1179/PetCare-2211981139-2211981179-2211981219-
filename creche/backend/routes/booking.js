const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Creche = require('../models/Creche');
const verifyToken = require('../middleware/verifyToken');

// ─── POST /booking (protected) ────────────────────────────────────
router.post('/booking', verifyToken, async (req, res) => {
    const crecheInfo = req.body.crecheInfo;
    const bookingDetails = req.body.bookingDetails;
    const userInfo = req.body.userInfo.User;

    const now = new Date();
    const time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    const date = now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();

    try {
        // Step 1: Find the creche
        const creche = await Creche.findOne({
            crecheid: crecheInfo.id,
            location: crecheInfo.location
        });
        if (!creche) return res.status(404).send('Creche not found');

        // Step 2: Push booking into creche
        creche.bookings.push(bookingDetails);
        await creche.save();

        // Step 3: Find the user
        const user = await User.findOne({ userName: userInfo.userName });
        if (!user) return res.status(404).send('User not found');

        // Step 4: Push booking into user history
        const booking = {
            date,
            time,
            location: crecheInfo.location,
            crecheName: creche.name,
            price: creche.price,
            id: crecheInfo.id,
        };

        user.bookingHistory.push(booking);
        user.currentBooking.push(booking);
        await user.save();

        res.send("ok");

    } catch (err) {
        console.error('Booking error:', err);
        res.status(500).send('Internal Server Error');
    }
});

// ─── POST /cancelbooking (protected) ─────────────────────────────
router.post('/cancelbooking', verifyToken, async (req, res) => {
    const { userName, bookingIndex } = req.body;

    try {
        const user = await User.findOne({ userName });
        if (!user) return res.status(404).send('User not found');

        if (!user.currentBooking || bookingIndex === undefined) {
            return res.status(400).send('Invalid request');
        }

        // Remove booking from currentBooking only (keep in history)
        user.currentBooking.splice(bookingIndex, 1);
        await user.save();

        res.send({ status: 'cancelled' });

    } catch (err) {
        console.error('Cancel booking error:', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;