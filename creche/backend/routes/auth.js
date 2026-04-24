const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const USERS_FILE = path.join(__dirname, '..', 'users.json');

const SALT_ROUNDS = 10;
const OWNER_SECRET_KEY = "PETCARE@OWNER2024";
const JWT_SECRET = "petcare_jwt_secret_2024"; // keep this private

// ─── Helper: generate token ────────────────────────────────────────
const generateToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            userName: user.userName,
            crecheOwner: user.crecheOwner,
        },
        JWT_SECRET,
        { expiresIn: '7d' } // token valid for 7 days
    );
};

// ─── POST /login ───────────────────────────────────────────────────
router.post('/login', (req, res) => {
    const { username, currentPassword } = req.body;

    fs.readFile(USERS_FILE, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Internal Server Error');

        let users = {};
        try { users = JSON.parse(data || '{}'); } catch { users = {}; }
        const user = users[username];
        if (!user) return res.send({ status: "wrong credentials" });

        bcrypt.compare(currentPassword, user.password, (err, isMatch) => {
            if (err) return res.status(500).send('Internal Server Error');

            if (isMatch) {
                const token = generateToken(user);
                if (user.crecheOwner) {
                    res.send({ status: "crecheowner loggedin", data: user, token });
                } else {
                    res.send({ status: "loggedin", data: user, token });
                }
            } else {
                res.send({ status: "wrong credentials" });
            }
        });
    });
});

// ─── POST /signin ──────────────────────────────────────────────────
router.post('/signin', (req, res) => {
    const { username, currentPassword, role, phoneNumber, email, location, ownerSecretKey } = req.body;

    // Validate owner secret key
    if (role === "crecheowner" && ownerSecretKey !== OWNER_SECRET_KEY) {
        return res.send({ status: "invalid owner key" });
    }

    fs.readFile(USERS_FILE, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Internal Server Error');

        const uid = uuidv4();
        let users = {};
        try { users = JSON.parse(data || '{}'); } catch { users = {}; }
        const user = users[username];

        if (user) {
            // Username already taken — always block signup, show error
            return res.send({ status: "username taken" });
        } else {
            // New user — hash password and save
            bcrypt.hash(currentPassword, SALT_ROUNDS, (err, hashedPassword) => {
                if (err) return res.status(500).send('Internal Server Error');

                const newUser = {
                    userName: username,
                    email: email || null,
                    bookingHistory: [],
                    currentBooking: [],
                    profilePicture: null,
                    phoneNumber: phoneNumber || null,
                    password: hashedPassword,
                    crecheOwner: role === "crecheowner",
                    id: uid,
                    location: role === "crecheowner" ? location : null,
                };
                users[username] = newUser;

                fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), (err) => {
                    if (err) return res.status(500).send('Internal Server Error');
                    const token = generateToken(newUser);
                    res.send({ status: "signedin", data: newUser, id: uid, token });
                });
            });
        }
    });
});

// ─── POST /verifytoken — check if token is still valid ─────────────
router.post('/verifytoken', (req, res) => {
    const { token } = req.body;
    if (!token) return res.send({ valid: false });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        res.send({ valid: true, user: decoded });
    } catch (err) {
        res.send({ valid: false });
    }
});

module.exports = router;
module.exports.JWT_SECRET = JWT_SECRET;