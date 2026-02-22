const express = require('express');
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk');
require('dotenv').config();
const app = express();
const anthropic = new Anthropic({ apiKey: process.env.CLAUDE_API_KEY });
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
const conversationHistory = new Map();
app.post('/api/chat', async (req, res) => {
    try {
        const { message, sessionId = 'default' } = req.body;
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }
        if (!conversationHistory.has(sessionId)) {
            conversationHistory.set(sessionId, []);
        }
        const messages = conversationHistory.get(sessionId);
        messages.push({ role: 'user', content: message });
        const response = await anthropic.messages.create({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 1024,
            system: `You are PARTH-AI, a helpful and friendly AI assistant powered by Claude Sonnet 4.6. You provide accurate, detailed, and thoughtful responses to user queries. You are available 24/7 and completely free to use. Be conversational, helpful, and thorough in your responses.`,
            messages: messages
        });
        const assistantMessage = response.content[0].text;
        messages.push({ role: 'assistant', content: assistantMessage });
        if (messages.length > 20) {
            conversationHistory.set(sessionId, messages.slice(-20));
        }
        res.json({ response: assistantMessage });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to process request', message: error.message });
    }
});
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'PARTH-AI' });
});
app.post('/api/clear', (req, res) => {
    const { sessionId = 'default' } = req.body;
    conversationHistory.delete(sessionId);
    res.json({ message: 'Conversation cleared' });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🤖 PARTH-AI Server running on port ${PORT}`);
    console.log(`📱 Visit http://localhost:${PORT} to use the bot`);
    console.log(`🔌 API endpoint: http://localhost:${PORT}/api/chat`);
});