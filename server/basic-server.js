const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  console.log('Health check endpoint hit');
  res.json({ status: 'ok' });
});

// Chat endpoint
app.post('/api/chat', (req, res) => {
  console.log('Chat endpoint hit');
  
  // Always return a fixed response
  res.json({ response: "Hello! I'm FutureChatAI. How can I assist you today?" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Basic server running on port ${PORT}`);
});
