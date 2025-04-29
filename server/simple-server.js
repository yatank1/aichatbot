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
  console.log('Request body:', req.body);
  
  const { message } = req.body;
  
  if (!message) {
    console.log('No message provided');
    return res.status(400).json({ error: 'Message is required' });
  }
  
  console.log('Message received:', message);
  
  // Generate a simple response based on the input
  let response;
  
  if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
    response = "Hello! I'm FutureChatAI. How can I assist you today?";
  } else if (message.toLowerCase().includes('how are you')) {
    response = "I'm just a digital assistant, but I'm functioning well. Thanks for asking! How can I help you?";
  } else {
    response = `I received your message: "${message}". This is a simple response for testing purposes.`;
  }
  
  console.log('Sending response:', response);
  return res.json({ response });
});

// Start server
app.listen(PORT, () => {
  console.log(`Simple server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`Chat endpoint: curl -X POST -H "Content-Type: application/json" -d '{"message":"hello"}' http://localhost:${PORT}/api/chat`);
});
