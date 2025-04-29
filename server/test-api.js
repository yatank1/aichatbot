const dotenv = require('dotenv');
const { OpenAI } = require('openai');

// Load environment variables
dotenv.config();

async function testAPI() {
  console.log('Testing AIMLAPI...');
  console.log('API Key:', process.env.AIMLAPI_KEY ? process.env.AIMLAPI_KEY.substring(0, 5) + '...' : 'API key is not set');
  
  try {
    // Initialize OpenAI client with AIMLAPI configuration
    const client = new OpenAI({
      baseURL: 'https://api.aimlapi.com/v1',
      apiKey: process.env.AIMLAPI_KEY,
    });
    
    console.log('OpenAI client initialized with AIMLAPI configuration');
    
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
          content: "Hello, who are you?"
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const responseText = completion.choices[0].message.content;
    console.log('AIMLAPI Response:', responseText);
  } catch (error) {
    console.error('Error calling AIMLAPI:', error);
    console.error('Error message:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

testAPI();
