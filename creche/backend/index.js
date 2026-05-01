const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use('/', require('./routes/auth'));
app.use('/', require('./routes/creche'));
app.use('/', require('./routes/booking'));
app.use('/', require('./routes/reviews'));
app.use('/', require('./routes/posts'));
app.use('/', require('./routes/upload'));
app.use('/', require('./routes/owner'));

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});