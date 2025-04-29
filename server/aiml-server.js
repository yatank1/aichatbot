const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');

// Load environment variables
dotenv.config();

const app = express();
const PORT = 4000; // Use the same port as the fixed server

// Middleware with verbose logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  
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

// Initialize OpenAI client with AIMLAPI configuration
const client = new OpenAI({
  baseURL: 'https://api.aimlapi.com/v1',
  apiKey: process.env.AIMLAPI_KEY,
});

// Routes
app.post('/api/chat', async (req, res) => {
  console.log('Chat endpoint hit');
  console.log('Request body:', JSON.stringify(req.body, null, 2));
  
  try {
    const { message } = req.body;
    
    if (!message) {
      console.log('No message provided');
      return res.status(400).json({ error: 'Message is required' });
    }
    
    console.log('Message received:', message);
    console.log('Using AIMLAPI with key:', process.env.AIMLAPI_KEY ? process.env.AIMLAPI_KEY.substring(0, 5) + '...' : 'API key is not set');
    
    try {
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
    } catch (aimlError) {
      console.error('Error calling AIMLAPI:', aimlError);
      console.error('Error details:', aimlError.response?.data || aimlError.message);
      console.error('Full error object:', JSON.stringify(aimlError, null, 2));
      console.error('Error stack:', aimlError.stack);
      
      // Fall back to a mock response if AIMLAPI fails
      console.log('Falling back to mock response');
      
      // Generate a mock response based on the input
      let mockResponse;
      
      if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
        mockResponse = "Hello! I'm FutureChatAI. How can I assist you today?";
      } else if (message.toLowerCase().includes('how are you')) {
        mockResponse = "I'm just a digital assistant, but I'm functioning well. Thanks for asking! How can I help you?";
      } else {
        mockResponse = `I received your message: "${message}". This is a mock response because there was an error connecting to the AI service.`;
      }
      
      return res.json({ response: mockResponse });
    }
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  console.log('Health check endpoint hit');
  res.json({ status: 'ok' });
});

// Start server
app.listen(PORT, () => {
  console.log(`AIMLAPI server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`Chat endpoint: http://localhost:${PORT}/api/chat`);
  console.log(`Using AIMLAPI key: ${process.env.AIMLAPI_KEY ? process.env.AIMLAPI_KEY.substring(0, 5) + '...' : 'API key is not set'}`);
});
