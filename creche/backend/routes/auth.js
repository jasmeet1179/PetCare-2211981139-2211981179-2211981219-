const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const SALT_ROUNDS = 10;
const OWNER_SECRET_KEY = process.env.OWNER_SECRET_KEY || "PETCARE@OWNER2024";
const JWT_SECRET = process.env.JWT_SECRET || "petcare_jwt_secret_2024";

// ─── Helper: generate token ────────────────────────────────────────
const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            userName: user.userName,
            crecheOwner: user.crecheOwner,
        },
        JWT_SECRET,
        { expiresIn: '7d' }
    );
};

// ─── POST /login ───────────────────────────────────────────────────
router.post('/login', async (req, res) => {
    const { username, currentPassword } = req.body;

    try {
        const user = await User.findOne({ userName: username });
        if (!user) return res.send({ status: "wrong credentials" });

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) return res.send({ status: "wrong credentials" });

        const token = generateToken(user);
        if (user.crecheOwner) {
            res.send({ status: "crecheowner loggedin", data: user, token });
        } else {
            res.send({ status: "loggedin", data: user, token });
        }
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).send('Internal Server Error');
    }
});

// ─── POST /signin ──────────────────────────────────────────────────
router.post('/signin', async (req, res) => {
    const { username, currentPassword, role, phoneNumber, email, location, ownerSecretKey } = req.body;

    // Validate owner secret key
    if (role === "crecheowner" && ownerSecretKey !== OWNER_SECRET_KEY) {
        return res.send({ status: "invalid owner key" });
    }

    try {
        // Check if username already taken
        const existingUser = await User.findOne({ userName: username });
        if (existingUser) {
            return res.send({ status: "username taken" });
        }

        // Hash password and create new user
        const hashedPassword = await bcrypt.hash(currentPassword, SALT_ROUNDS);
        const newUser = await User.create({
            userName: username,
            email: email || null,
            phoneNumber: phoneNumber || null,
            password: hashedPassword,
            crecheOwner: role === "crecheowner",
            location: role === "crecheowner" ? location : null,
        });

        const token = generateToken(newUser);
        res.send({ status: "signedin", data: newUser, token });

    } catch (err) {
        console.error('Signin error:', err);
        res.status(500).send('Internal Server Error');
    }
});

// ─── POST /verifytoken ─────────────────────────────────────────────
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