const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// ─── Middleware ────────────────────────────────────────────────────
app.use(express.json());
app.use(cors());

// ─── Routes ───────────────────────────────────────────────────────
app.use('/', require('./routes/auth'));
app.use('/', require('./routes/creche'));
app.use('/', require('./routes/booking'));
app.use('/', require('./routes/reviews'));
app.use('/', require('./routes/posts'));
app.use('/', require('./routes/upload'));
app.use('/', require('./routes/owner'));

// ─── Start Server ─────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});