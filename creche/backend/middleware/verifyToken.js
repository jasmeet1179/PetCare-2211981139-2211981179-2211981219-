const jwt = require('jsonwebtoken');
const JWT_SECRET = "petcare_jwt_secret_2024";

const verifyToken = (req, res, next) => {
    // Get token from Authorization header: "Bearer <token>"
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).send({ status: 'error', message: 'No token provided. Please log in.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // attach user info to request
        next();
    } catch (err) {
        return res.status(403).send({ status: 'error', message: 'Invalid or expired token. Please log in again.' });
    }
};

module.exports = verifyToken;