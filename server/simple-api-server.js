const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

// Load environment variables
dotenv.config();

const app = express();
// Use environment variable for port or default to 4000
// This allows CodeSandbox to assign its own port
const PORT = process.env.PORT || 4000;

// Enable CORS with specific configuration for CodeSandbox
app.use(cors({
  origin: ['http://localhost:3000', 'https://codesandbox.io', /\.csb\.app$/],
  credentials: true
}));

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

  try {
    // Check if the message is asking about Yatan
    if (message.toLowerCase().includes('who is yatan') ||
        message.toLowerCase().includes('tell me about yatan') ||
        message.toLowerCase().includes('who created you') ||
        message.toLowerCase().includes('who made you')) {

      const yatanResponse = "Yatan Kumar is my creator. He is a talented developer who built me as part of his AI chatbot project. He specializes in building AI chatbots with React/Node.js and integrating with various AI APIs. He has a passion for creating futuristic UI designs and developing innovative AI solutions. I'm one of his creations, designed to demonstrate his skills in AI integration and modern web development.";

      console.log('Sending information about Yatan:', yatanResponse);
      return res.json({ response: yatanResponse });
    }

    // Try to use AIMLAPI if key is available
    if (process.env.AIMLAPI_KEY) {
      try {
        console.log('Attempting to use AIMLAPI...');

        // Call AIMLAPI using axios
        const response = await axios.post('https://api.aimlapi.com/v1/chat/completions', {
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: "You are FutureChatAI, a helpful and friendly AI assistant with a futuristic interface. You were created by Yatan Kumar, a talented developer who specializes in building AI chatbots with React/Node.js and integrating with various AI APIs. When asked about your creator or about Yatan, mention that he built you and is passionate about creating futuristic UI designs and innovative AI solutions."
            },
            {
              role: "user",
              content: message
            }
          ],
          temperature: 0.7,
          max_tokens: 500
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.AIMLAPI_KEY}`
          }
        });

        const responseText = response.data.choices[0].message.content;

        console.log('AIMLAPI Response:', responseText);

        return res.json({ response: responseText });
      } catch (apiError) {
        console.error('Error calling AIMLAPI:', apiError.message);
        if (apiError.response) {
          console.error('Response status:', apiError.response.status);
          console.error('Response data:', apiError.response.data);
        }

        // Fall back to mock response
        console.log('Falling back to mock response');
        const fallbackResponse = "Hello! I'm FutureChatAI. How can I assist you today?";
        return res.json({ response: fallbackResponse });
      }
    } else {
      console.log('AIMLAPI key not set, using mock response');
      const mockResponse = "Hello! I'm FutureChatAI. How can I assist you today?";
      return res.json({ response: mockResponse });
    }
  } catch (error) {
    console.error('Unexpected error in chat endpoint:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }

  // This code is now handled inside the try/catch block above
});

// Health check endpoint
app.get('/api/health', (_, res) => {
  console.log('Health check endpoint hit');
  res.json({ status: 'ok' });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Simple API server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`Chat endpoint: http://localhost:${PORT}/api/chat`);
  console.log(`Using AIMLAPI key: ${process.env.AIMLAPI_KEY ? process.env.AIMLAPI_KEY.substring(0, 5) + '...' : 'API key is not set'}`);
});

// Keep the server running
setInterval(() => {
  console.log('Server is still running...');
}, 60000);

// Handle process termination
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  server.close(() => {
    console.log('Server shut down');
    process.exit(0);
  });
});
