const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware with verbose logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Headers:', JSON.stringify(req.headers, null, 2));

  // Log request body for POST requests
  if (req.method === 'POST') {
    const originalJson = res.json;
    res.json = function(body) {
      console.log('Response body:', JSON.stringify(body, null, 2));
      return originalJson.call(this, body);
    };
  }

  next();
});

// Enable CORS
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Routes
app.post('/api/chat', (req, res) => {
  console.log('Chat endpoint hit');
  console.log('Request body:', JSON.stringify(req.body, null, 2));

  try {
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
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Add a test endpoint
app.get('/test', (req, res) => {
  console.log('Test endpoint hit');
  res.send('Server is working!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Test the server with: curl http://localhost:${PORT}/test`);
  console.log(`Chat endpoint: curl -X POST -H "Content-Type: application/json" -d '{"message":"hello"}' http://localhost:${PORT}/api/chat`);
});
