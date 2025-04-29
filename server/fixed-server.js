const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');

// Load environment variables
dotenv.config();

const app = express();
const PORT = 4000; // Use a different port

// Middleware
app.use(cors());
app.use(express.json());

// Middleware for logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Initialize OpenAI client with AIMLAPI configuration
let client;
try {
  client = new OpenAI({
    baseURL: 'https://api.aimlapi.com/v1',
    apiKey: process.env.AIMLAPI_KEY,
  });
  console.log('OpenAI client initialized with AIMLAPI configuration');
} catch (error) {
  console.error('Error initializing OpenAI client:', error);
}

// Routes
app.post('/api/chat', async (req, res) => {
  console.log('Chat endpoint hit');
  console.log('Request body:', req.body);

  const { message } = req.body;

  if (!message) {
    console.log('No message provided');
    return res.status(400).json({ error: 'Message is required' });
  }

  console.log('Message received:', message);

  // Try to use AIMLAPI
  if (client && process.env.AIMLAPI_KEY) {
    try {
      console.log('Attempting to use AIMLAPI...');

      // Call AIMLAPI using OpenAI's SDK
      const completion = await client.chat.completions.create({
        model: "gpt-4o", // You can change this to any model supported by AIMLAPI
        messages: [
          {
            role: "system",
            content: "You are FutureChatAI, a helpful and friendly AI assistant with a futuristic interface."
          },
          {
            role: "user",
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      });

      const responseText = completion.choices[0].message.content;
      console.log('AIMLAPI Response:', responseText);

      return res.json({ response: responseText });
    } catch (error) {
      console.error('Error calling AIMLAPI:', error);
      console.error('Error message:', error.message);

      // Fall back to mock response
      console.log('Falling back to mock response');
    }
  } else {
    console.log('AIMLAPI client not initialized or API key not set, using mock response');
  }

  // Mock response as fallback
  const response = "Hello! I'm FutureChatAI. How can I assist you today?";

  console.log('Sending mock response:', response);
  return res.json({ response });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  console.log('Health check endpoint hit');
  res.json({ status: 'ok' });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Fixed server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`Chat endpoint: http://localhost:${PORT}/api/chat`);
  console.log(`Using AIMLAPI key: ${process.env.AIMLAPI_KEY ? process.env.AIMLAPI_KEY.substring(0, 5) + '...' : 'API key is not set'}`);
});

// Keep the server running
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  server.close(() => {
    console.log('Server shut down');
    process.exit(0);
  });
});
