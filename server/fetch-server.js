const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fetch = require('node-fetch');

// Load environment variables
dotenv.config();

const app = express();
const PORT = 4000;

// Enable CORS
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

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
  if (process.env.AIMLAPI_KEY) {
    try {
      console.log('Attempting to use AIMLAPI...');
      
      // Call AIMLAPI using fetch
      const response = await fetch('https://api.aimlapi.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.AIMLAPI_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4o",
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
        })
      });
      
      if (!response.ok) {
        throw new Error(`AIMLAPI responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      const responseText = data.choices[0].message.content;
      
      console.log('AIMLAPI Response:', responseText);
      
      return res.json({ response: responseText });
    } catch (error) {
      console.error('Error calling AIMLAPI:', error);
      console.error('Error message:', error.message);
      
      // Fall back to mock response
      console.log('Falling back to mock response');
    }
  } else {
    console.log('AIMLAPI key not set, using mock response');
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
app.listen(PORT, () => {
  console.log(`Fetch server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`Chat endpoint: http://localhost:${PORT}/api/chat`);
  console.log(`Using AIMLAPI key: ${process.env.AIMLAPI_KEY ? process.env.AIMLAPI_KEY.substring(0, 5) + '...' : 'API key is not set'}`);
});
