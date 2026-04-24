const express = require('express');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Route to handle GET requests
app.get('/signin', (req, res) => {
    res.sendFile('./pages/signin.html');
});

// Route to handle POST requests
app.post('/data', (req, res) => {
    const data = req.body;
    res.send(`Received data: ${JSON.stringify(data)}`);
});

// Route to handle PUT requests
app.put('/update', (req, res) => {
    const update = req.body;
    res.send(`Update received: ${JSON.stringify(update)}`);
});

// Route to handle DELETE requests
app.delete('/delete', (req, res) => {
    res.send('Delete request received');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});