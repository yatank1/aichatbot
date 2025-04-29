const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000; // Use a different port

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  console.log('Health check endpoint hit');
  res.json({ status: 'ok' });
});

// Chat endpoint
app.post('/chat', (req, res) => {
  console.log('Chat endpoint hit');
  console.log('Request body:', req.body);
  
  const { message } = req.body;
  
  if (!message) {
    console.log('No message provided');
    return res.status(400).json({ error: 'Message is required' });
  }
  
  console.log('Message received:', message);
  
  // Generate a simple response
  const response = `You said: "${message}". This is a test response.`;
  
  console.log('Sending response:', response);
  return res.json({ response });
});

// Start server
app.listen(PORT, () => {
  console.log(`New server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Chat endpoint: http://localhost:${PORT}/chat`);
});
