const express = require('express');
const app = express();
const axios = require('axios');
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Route to integrate with Claude API
app.post('/api/clh', async (req, res) => {
    const userInput = req.body.input;
    try {
        const response = await axios.post('https://claude.api.endpoint', { input: userInput }); // Replace with actual Claude API endpoint
        res.json(response.data);
    } catch (error) {
        console.error('Error calling Claude API:', error);
        res.status(500).send('Error calling Claude API');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});